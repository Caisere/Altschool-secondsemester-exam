
import { Loader2 } from 'lucide-react'

const EachTodoLoader = () => {
    return (
        <div className="md:left-[100%] md:z-[10000]">
            <div className=''>
                <Loader2 className='w-12 h-12 text-secBackground text-center' />
            </div>
        </div>
    )
}

export default EachTodoLoader