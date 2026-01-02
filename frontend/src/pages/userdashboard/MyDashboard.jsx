import React from "react";
import "../../assets/styles/userdashboard/mydashboard.css";
import NotesUiCard from "./NotesUiCard";
import CategoriesBar from "./CategoriesBar";

function MyDashboard() {
  return (
    <section className="ud_wrapper">

      <div className="ud_midSection">

        {/* ---------- Left Sidebar ---------- */}
        <aside className="ud_left">
          <CategoriesBar />
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
