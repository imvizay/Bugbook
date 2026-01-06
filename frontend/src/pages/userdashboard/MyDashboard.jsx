import React from "react";
import { useState,useEffect } from "react";
import "../../assets/styles/userdashboard/mydashboard.css";
import NotesUiCard from "./NotesUiCard";
import CategoriesBar from "./CategoriesBar";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000';

function MyDashboard() {

  // lifted state
  let [selected,setSelected] = useState(1)
  let [loading ,setLoading] = useState(false);
  let [categories,setCategories] = useState([])
  let [notes,setNotes] = useState([])

  let [editNote,setEditNote] = useState({})

  useEffect(()=>{
    console.log("Selected Lang Id",selected)
  },[notes])

  useEffect(() => {
     if (!selected) return;   
 
     setLoading(true);
 
     const t = setTimeout(() => {
       axios
         .get(`${API_URL}/api/user/language/notes/?language=${selected}`)
         .then((res) => setNotes(res.data || []))
         .catch((err) => console.log(err.response?.data))
         .finally(() => setLoading(false));
     }, 500);
 
     return () => clearTimeout(t);
   }, [selected]);

   let onDelete=(id)=>{
    axios.delete(`${API_URL}/api/notes/${id}/`)
    .then((res)=>console.log(res.data))
    .catch(error=>console.log(error?.response?.data))
   }

   let onEdit=(id)=>{

   }
 

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
           {loading ? <p>Loading...</p> : 
           
            <NotesUiCard 
              notes={notes}
              onDelete={onDelete}
           
             />}
          </div>

        </main>

      </div>

    </section>
  );
}

export default MyDashboard;
