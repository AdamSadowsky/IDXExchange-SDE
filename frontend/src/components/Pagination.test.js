import { render, screen, fireEvent } from "@testing-library/react"
import Pagination from "./Pagination"

test("Go to page 2", () => {
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()

    window.scrollTo = jest.fn()

    render(<Pagination page={1} items={20} total={40} limit={20} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset}/>)

    fireEvent.click(
        screen.getByRole("button", { name: "→" })
    )

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2)
    expect(mockSetOffset).toHaveBeenCalledWith(20)
})

test("Go to page 1", () => {
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()

    window.scrollTo = jest.fn()

    render(<Pagination page={2} items={20} total={40} limit={20} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset}/>)

    fireEvent.click(
        screen.getByRole("button", { name: "←" })
    )

    expect(mockSetCurrentPage).toHaveBeenCalledWith(1)
    expect(mockSetOffset).toHaveBeenCalledWith(0)
})

test("Go to page 4", () => {
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()

    window.scrollTo = jest.fn()

    render(<Pagination page={2} items={20} total={80} limit={20} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset}/>)

    fireEvent.click(
        screen.getByRole("button", { name: "4" })
    )

    expect(mockSetCurrentPage).toHaveBeenCalledWith(4)
    expect(mockSetOffset).toHaveBeenCalledWith(60)
})