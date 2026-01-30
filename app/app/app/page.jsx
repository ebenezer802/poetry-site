"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const poems = [
  {
    id: "deputy-father",
    title: "Deputy Father",
    content: `At some point in life, you take your first steps.

You make dolls, shape toys, eat and laugh.

He was not father —
but he carried the role
by love, by presence, by instinct.

That is the Deputy Father.`
  },
  {
    id: "role-model",
    title: "Role Model",
    content: `Being a role model
is not about being flawless.

It is about walking in such a way
that someone behind you
can still find their steps.`
  }
];

export default function Home() {
  return (
    <main style={{ padding: "6rem 1.5rem", maxWidth: "700px", margin: "auto" }}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        Brothers
        <br />
        <span style={{ fontSize: "1rem", opacity: 0.6 }}>
          Scroll slowly
        </span>
      </motion.h1>

      {poems.map((poem, index) => (
        <motion.article
          key={poem.id}
          id={poem.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "8rem" }}
        >
          <h2>{poem.title}</h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
              fontSize: "1.1rem"
            }}
          >
            {poem.content}
          </pre>

          {index < poems.length - 1 && (
            <a
              href={`#${poems[index + 1].id}`}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px"
              }}
            >
              <ChevronDown />
            </a>
          )}
        </motion.article>
      ))}
    </main>
  );
}
