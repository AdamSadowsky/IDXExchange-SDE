import { render, screen, fireEvent } from "@testing-library/react"
import PropertyFilters from "./PropertyFilters"

test("search sends city", () => {
    const mockOnSearch = jest.fn()
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()
    const mockSetSortBy = jest.fn()
    const mockSetSortOrder = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset} sortBy="" sortOrder="" setSortBy={mockSetSortBy} setSortOrder={mockSetSortOrder} />)

    fireEvent.change(
        screen.getByPlaceholderText("City"),
        { target: { value: "Oroville" } }
    )

    fireEvent.click(
        screen.getByRole("button", { name: "Search" })
    )

    expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
            city: "Oroville"
        })
    )
})

test("search sends city and minimum price", () => {
    const mockOnSearch = jest.fn()
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()
    const mockSetSortBy = jest.fn()
    const mockSetSortOrder = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset} sortBy="" sortOrder="" setSortBy={mockSetSortBy} setSortOrder={mockSetSortOrder} />)

    fireEvent.change(
        screen.getByPlaceholderText("City"),
        { target: { value: "Oroville" } }
    )

    fireEvent.change(
        screen.getByPlaceholderText("Minimum Price"),
        { target: { value: "500000"} }
    )

    fireEvent.click(
        screen.getByRole("button", { name: "Search" })
    )

    expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
            city: "Oroville",
            minPrice: "500000"
        })
    )
})

test("beds and baths", () => {
    const mockOnSearch = jest.fn()
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()
    const mockSetSortBy = jest.fn()
    const mockSetSortOrder = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset} sortBy="" sortOrder="" setSortBy={mockSetSortBy} setSortOrder={mockSetSortOrder} />)
    const selects = screen.getAllByRole("combobox")

    fireEvent.change(selects[0], {
        target: { value: "5" }
    })

    fireEvent.change(selects[1], {
        target: { value: "4" }
    })

    fireEvent.click(
        screen.getByRole("button", { name: "Search" })
    )

    expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({beds: "5", baths: "4"}))
})

test("sort by and sort order", () => {
    const mockOnSearch = jest.fn()
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()
    const mockSetSortBy = jest.fn()
    const mockSetSortOrder = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset} sortBy="" sortOrder="" setSortBy={mockSetSortBy} setSortOrder={mockSetSortOrder} />)
    const selects = screen.getAllByRole("combobox")

    fireEvent.change(selects[2], {
        target: { value: "1" }
    })

    fireEvent.change(selects[3], {
        target: { value: "2" }
    })

    expect(mockSetSortBy).toHaveBeenCalledWith("1")
    expect(mockSetSortOrder).toHaveBeenCalledWith("2")
})

test("city and maximum price and zipcode", () => {
    const mockOnSearch = jest.fn()
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()
    const mockSetSortBy = jest.fn()
    const mockSetSortOrder = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset} sortBy="" sortOrder="" setSortBy={mockSetSortBy} setSortOrder={mockSetSortOrder} />)

    fireEvent.change(
        screen.getByPlaceholderText("City"),
        { target: { value: "Los Angeles" } }
    )

    fireEvent.change(
        screen.getByPlaceholderText("Zipcode"),
        { target: { value: "34211" } }
    )

    fireEvent.change(
        screen.getByPlaceholderText("Maximum Price"),
        { target: { value: "5000000"} }
    )

    fireEvent.click(
        screen.getByRole("button", { name: "Search" })
    )

    expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
            city: "Los Angeles",
            zipcode: "34211",
            maxPrice: "5000000"
        })
    )
})

test("clear", () => {
    const mockOnSearch = jest.fn()
    const mockSetCurrentPage = jest.fn()
    const mockSetOffset = jest.fn()
    const mockSetSortBy = jest.fn()
    const mockSetSortOrder = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} setCurrentPage={mockSetCurrentPage} setOffset={mockSetOffset} sortBy="" sortOrder="" setSortBy={mockSetSortBy} setSortOrder={mockSetSortOrder} />)

    fireEvent.click(
        screen.getByRole("button", { name: "Clear" })
    )

    expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
            city: "",
            zipcode: "",
            minPrice: "",
            maxPrice: "",
            beds: "",
            baths: ""
        })
    )
})