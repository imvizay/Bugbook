import React from "react";
import { useState,useEffect } from "react";
import "../../assets/styles/userdashboard/mydashboard.css";
import NotesUiCard from "./NotesUiCard";
import CategoriesBar from "./CategoriesBar";


const API_URL = 'http://127.0.0.1:8000';

function MyDashboard() {

  // lifted state
  let [selected,setSelected] = useState("javascript")
  let [categories,setCategories] = useState([])

  return (
    <section className="ud_wrapper">

      <div className="ud_midSection">

        {/* ---------- Left Sidebar ---------- */}
        <aside className="ud_left">
          <CategoriesBar 
           selected={selected}
           setSelected={setSelected}
           API_URL={API_URL}
           categories={categories}
           setCategories={setCategories}
           />
        </aside>

        {/* ---------- Right Content ---------- */}
        <main className="ud_right">

          <div className="ud_header">
            <h1>Recent Notes</h1>
            <p>Your latest learning entries</p>
          </div>

          <div className="ud_content">
            <NotesUiCard />
          </div>

        </main>

      </div>

    </section>
  );
}

export default MyDashboard;
