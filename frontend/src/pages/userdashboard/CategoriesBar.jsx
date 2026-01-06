
import { Layers, Code2 } from "lucide-react"
import "../../assets/styles/userdashboard/categories_bar.css"
import { useEffect,useState } from "react"
import axios from "axios"



function CategoriesBar({categories,setCategories,selected,setSelected,API_URL}) {
 

  useEffect(()=>{
    axios.get(`${API_URL}/api/lang/`)
    .then(res=>setCategories(res.data || {}))
    .catch((error)=>console.log(error.response.data))
  },[])

 

  return (
    <aside className="categoriesBar">

      {/* ---------- Categories ---------- */}
      <div className="filterSection">
        <div className="filterHeader">
          <Layers size={16} />
          <h3>Categories</h3>
        </div>

        <div className="filterList">
         {categories?.length > 0 && 
          categories.map((el)=>(
            <span 
              className={selected == el.id ? "activeCategory" : ''} 
              key={el.id}
              onClick={()=>setSelected(el.id)}
              > 
              {el.language_name.toUpperCase()}
            </span>
          ))
         }
        </div>
      </div>

    </aside>
  )
}

export default CategoriesBar
