
function Pagination({ page, items, total, limit, setCurrentPage, setOffset}) {
    const totalPages = Math.ceil(total / limit)
    const currentCount = (page * limit) - limit
    const startCount = total === 0 ? currentCount : currentCount + 1
    const endCount = currentCount + items

    const pages = []

    if(totalPages <= 7) {
        pages.push(1)
        for(let i = 1; i < totalPages; i++) {
            pages.push(1 + pages[i - 1])
        }
    } else if(page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages)
    } else if(page >= totalPages - 3) {
        pages.push(
            1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages)
    }

    return (
        <>
            <p className="total">Showing {startCount}-{endCount} of {total} properties</p>
            {totalPages > 1 && (
            <div className="paginationHolder">
                <p className="page">Page {page} of {totalPages}</p>      
                <div className="buttonHolder">
                    <button className="prev" disabled={page === 1} onClick={() => {
                        setCurrentPage(page - 1)
                        setOffset(startCount - limit - 1)
                        window.scrollTo(0, 0)
                    }}>←</button> 

                    {pages.map((pageNumber, index) => {
                        if(pageNumber === "...") {
                            return (
                                <span className="ellipsis" key={`ellipsis-${index}`}>...</span>
                            ) 
                        }
                        return (
                            <button className="pageBttn" key={pageNumber} onClick={() => {
                                setCurrentPage(pageNumber)
                                setOffset((pageNumber * limit) - limit)
                                window.scrollTo(0, 0)
                            }}>{pageNumber}</button>
                        )
                    })}

                    <button className="next" disabled={page === totalPages} onClick={() => {
                        setCurrentPage(page + 1)
                        setOffset(endCount)
                        window.scrollTo(0, 0)
                    }}>→</button>   
                </div>
            </div>
            )}
        </>
    )
}

export default Pagination