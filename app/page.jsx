"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart as HeartIcon, MessageCircle } from "lucide-react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDua7iMjNe7KbzQsnqFgb6RlbBQoosUVWw",
  authDomain: "just-poetry-885ae.firebaseapp.com",
  projectId: "just-poetry-885ae",
  storageBucket: "just-poetry-885ae.firebasestorage.app",
  messagingSenderId: "41192988856",
  appId: "1:41192988856:web:033afddbcb48879e07d44d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const poemList = [
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
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    async function fetchPoems() {
      const withData = await Promise.all(
        poemList.map(async (p) => {
          const ref = doc(db, "poems", p.id);
          const snap = await getDoc(ref);

          if (!snap.exists()) {
            await setDoc(ref, { likes: 0, comments: [] });
            return { ...p, likes: 0, comments: [] };
          }

          const data = snap.data();
          return { ...p, likes: data.likes, comments: data.comments };
        })
      );
      setPoems(withData);
    }

    fetchPoems();
  }, []);

  const handleLike = async (id) => {
    const ref = doc(db, "poems", id);
    await updateDoc(ref, { likes: increment(1) });

    setPoems((prs) =>
      prs.map((poem) =>
        poem.id === id ? { ...poem, likes: (poem.likes || 0) + 1 } : poem
      )
    );
  };

  const handleComment = async (id, text) => {
    if (!text) return;
    const ref = doc(db, "poems", id);
    await updateDoc(ref, {
      comments: arrayUnion({ text, time: Date.now() })
    });

    setPoems((prs) =>
      prs.map((poem) =>
        poem.id === id
          ? { ...poem, comments: [...(poem.comments || []), { text }] }
          : poem
      )
    );
  };

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
          Scroll & react
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

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button onClick={() => handleLike(poem.id)}>
              <HeartIcon /> {poem.likes || 0}
            </button>

            <CommentBox onSubmit={(t) => handleComment(poem.id, t)} />
          </div>

          {poem.comments?.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              {poem.comments.map((c, i) => (
                <p key={i} style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                  💬 {c.text}
                </p>
              ))}
            </div>
          )}

          {index < poemList.length - 1 && (
            <a
              href={`#${poemList[index + 1].id}`}
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

function CommentBox({ onSubmit }) {
  const [text, setText] = useState("");

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Comment..."
        style={{ flex: 1, padding: "0.4rem" }}
      />
      <button onClick={() => { onSubmit(text); setText(""); }}>
        <MessageCircle />
      </button>
    </div>
  );
}
