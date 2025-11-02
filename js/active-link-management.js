export function setActiveLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html"

  const allLinks = document.querySelectorAll(".nav-item a")

  allLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")

    link.closest("li").classList.remove("active")

    if (linkPath === currentPath) {
      link.closest("li").classList.add("active")
    }
  })

  allInsideListElements.forEach((li, index) => {
    li.addEventListener("click", (e) => {
      removeAllActiveClasses()
      console.log(e.target.classList)
      li.classList.add("active")
    })
  })

  allNavItems.forEach((li, index) => {
    li.addEventListener("click", (e) => {
      removeAllActiveClasses()
      console.log(e.target.classList)
      li.classList.add("active")
    })
  })
}
