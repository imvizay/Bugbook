
import { Layers, Code2 } from "lucide-react"
import "../../assets/styles/userdashboard/categories_bar.css"

function CategoriesBar() {
  return (
    <aside className="categoriesBar">

      {/* ---------- Categories ---------- */}
      <div className="filterSection">
        <div className="filterHeader">
          <Layers size={16} />
          <h3>Categories</h3>
        </div>

        <div className="filterList">
          <button className="filterItem">Frontend</button>
          <button className="filterItem">Backend</button>
          <button className="filterItem">Database</button>
        </div>
      </div>

      {/* ---------- Languages ---------- */}
      <div className="filterSection">
        <div className="filterHeader">
          <Code2 size={16} />
          <h3>Languages</h3>
        </div>

        <div className="filterList">
          <button className="filterItem">Python</button>
          <button className="filterItem">JavaScript</button>
          <button className="filterItem">C++</button>
        </div>
      </div>

    </aside>
  )
}

export default CategoriesBar
