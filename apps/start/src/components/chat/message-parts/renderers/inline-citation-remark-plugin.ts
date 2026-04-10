import { visit } from 'unist-util-visit'
import { isInlineCitationSourceLabel } from '../components/inline-citation'

type MdastParent = {
  children?: MdastNode[]
}

type MdastNode = {
  type?: string
  value?: string
  children?: MdastNode[]
}

function trimTrailingParen(node: MdastNode | undefined): void {
  if (!node || node.type !== 'text' || typeof node.value !== 'string') return
  if (!node.value.endsWith('(')) return

  node.value = node.value.slice(0, -1)
}

function trimLeadingParen(node: MdastNode | undefined): void {
  if (!node || node.type !== 'text' || typeof node.value !== 'string') return
  if (!node.value.startsWith(')')) return

  node.value = node.value.slice(1)
}

/**
 * Some models emit compact source citations as `( [domain.tld](url) )`.
 * Streamdown preserves the surrounding parentheses as sibling text nodes, so we
 * strip only those wrapper characters when the link label is domain-like.
 */
export function inlineCitationRemarkPlugin() {
  return (tree: MdastNode) => {
    visit(tree as never, 'paragraph', (paragraph: MdastParent) => {
      const children = paragraph.children
      if (!children || children.length === 0) return

      for (let index = 0; index < children.length; index += 1) {
        const child = children[index]
        if (child?.type !== 'link') continue

        const linkLabel =
          child.children?.length === 1 &&
          child.children[0]?.type === 'text' &&
          typeof child.children[0].value === 'string'
            ? child.children[0].value
            : null

        if (!linkLabel || !isInlineCitationSourceLabel(linkLabel)) continue

        trimTrailingParen(children[index - 1])
        trimLeadingParen(children[index + 1])
      }

      paragraph.children = children.filter((node) => {
        if (node.type !== 'text') return true
        return typeof node.value !== 'string' || node.value.length > 0
      })
    })
  }
}
