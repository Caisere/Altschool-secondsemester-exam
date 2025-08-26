
function ErrorBoundaryFallback() {
    return (
        <section  role="alert" className='flex flex-col items-center justify-center h-screen'>
            <p className='text-2xl font-bold'>Oops! Something went wrong</p>
            {/* <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => window.location.reload()}>Reload</button> */}
            {/* <Link to='/'>Go to Home</Link> */}
        </section>
    );
}

export default ErrorBoundaryFallback;
