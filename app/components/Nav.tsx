import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link>{" | "}
      <Link href="/bible">Bible</Link>{" | "}
      <Link href="/outline">Outline</Link>{" | "}
      <Link href="/scenes">Scenes</Link>{" | "}
      <Link href="/chapter">Chapter</Link>
    </nav>
  );
}
