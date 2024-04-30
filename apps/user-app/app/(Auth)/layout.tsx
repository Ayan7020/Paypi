  

export default function({ children }: {
    children: React.ReactNode;
}) { 
    return <div className="flex  h-screen justify-center items-center">  
    <div className="shadow-2xl p-10 rounded-2xl"> 
        {children}  
    </div>
    </div>
}


