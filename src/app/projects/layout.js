const Layout = ({children}) => {
    return ( 
        <div className=" w-full flex flex-col lg:items-center justify-center">
            <h1 className="mt-5 text-5xl text-start lg:text-center">My Work</h1>
            {children}
        </div>
     );
}
 
export default Layout;