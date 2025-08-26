
import { Loader2 } from "lucide-react";

const PageLoader = () => {
    return (
        <div className='grid place-items-center h-[100vh]'>
            <Loader2 className='w-20 h-20 text-secBackground' />
        </div>
    )
}

export default PageLoader