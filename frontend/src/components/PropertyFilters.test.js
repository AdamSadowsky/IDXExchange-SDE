import { render, screen, fireEvent } from "@testing-library/react"
import PropertyFilters from "./PropertyFilters"

test("search sends city", () => {
    const mockOnSearch = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} />)

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

test("search sends city and beds", () => {
    const mockOnSearch = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} />)

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

test("empty", () => {
    const mockOnSearch = jest.fn()

    render(<PropertyFilters onSearch={mockOnSearch} />)

    fireEvent.click(
        screen.getByRole("button", { name: "Search" })
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