type LoadMarks = {
  click?: number;
  pushCalled?: number;
  routeSeen?: number;
  cacheReady?: number;
  firstPaint?: number;
};

const KEY_PREFIX = "rift:threadLoad:";

function storageKey(threadId: string) {
  return `${KEY_PREFIX}${threadId}`;
}

function safeRead(threadId: string): LoadMarks | null {
  try {
    const raw = sessionStorage.getItem(storageKey(threadId));
    if (!raw) return null;
    return JSON.parse(raw) as LoadMarks;
  } catch {
    return null;
  }
}

function safeWrite(threadId: string, marks: LoadMarks) {
  try {
    sessionStorage.setItem(storageKey(threadId), JSON.stringify(marks));
  } catch {
    // ignore
  }
}

export function startThreadLoadMarks(threadId: string) {
  const click = performance.now();
  safeWrite(threadId, { click });
  return click;
}

export function markThreadLoad(threadId: string, key: keyof LoadMarks) {
  const now = performance.now();
  const prev = safeRead(threadId) ?? {};
  safeWrite(threadId, { ...prev, [key]: now });
  return now;
}

export function peekThreadLoadMarks(threadId: string) {
  return safeRead(threadId);
}

export function consumeThreadLoadBreakdown(threadId: string) {
  const marks = safeRead(threadId);
  if (!marks) return null;
  if (!marks.click) {
    // Still remove so we don't leak entries if something went wrong.
    try {
      sessionStorage.removeItem(storageKey(threadId));
    } catch {
      // ignore
    }
    return { threadId, error: "missing_click", marks } as const;
  }

  const { click, pushCalled, routeSeen, cacheReady, firstPaint } = marks;
  const breakdown = {
    threadId,
    click,
    pushCalled,
    routeSeen,
    cacheReady,
    firstPaint,
    ms_click_to_pushCalled: pushCalled ? pushCalled - click : null,
    ms_click_to_routeSeen: routeSeen ? routeSeen - click : null,
    ms_click_to_cacheReady: cacheReady ? cacheReady - click : null,
    ms_click_to_firstPaint: firstPaint ? firstPaint - click : null,
    ms_routeSeen_to_cacheReady:
      routeSeen && cacheReady ? cacheReady - routeSeen : null,
    ms_cacheReady_to_firstPaint:
      cacheReady && firstPaint ? firstPaint - cacheReady : null,
  };

  try {
    sessionStorage.removeItem(storageKey(threadId));
  } catch {
    // ignore
  }

  return breakdown;
}


