const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

console.log(currentPage);
console.log(menuItems);


for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}
