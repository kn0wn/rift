import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="text-center">
      <Image
        src="/avatar.png"
        className="mx-auto rounded-full"
        alt="User avatar"
        width={160}
        height={160}
      />
      <h1 className="mt-4 text-center text-2xl font-bold">Guest User</h1>
      <p className="text-muted-foreground text-center text-sm">
        guest@example.com
      </p>

      <div className="bg-sidebar-button mx-auto mt-2 w-fit rounded-full px-3 font-semibold">
        <span className="text-muted text-xs">Free Plan</span>
      </div>
    </div>
  );
}
