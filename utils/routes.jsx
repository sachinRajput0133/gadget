const routes = {
    home: "/",
    login: "/login",
    category:(cat)=>`/${cat}`,
    subCategory:(cat,subCat)=>`/${cat}/${subCat}`
  }
  
  export default routes
  