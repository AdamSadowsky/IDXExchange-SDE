import { render, screen, fireEvent } from "@testing-library/react"
import PropertyCard from "./PropertyCard"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}))

test("navigate to property", () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_Address: "123 Main St",
        L_City: "Oroville",
        L_State: "CA",
        L_SystemPrice: 500000,
        L_Keyword2: 3,
        LM_Dec_3: 2,
        LM_Int2_3: 1800,
        L_Photos: "[]"
    }

    render(<PropertyCard property={fakeProperty} />)

    const card = screen
        .getByText("123 Main St")
        .closest(".property-card")

    fireEvent.click(card)

    expect(mockNavigate).toHaveBeenCalledWith(
        "/property/1234567890"
    )
})

test("renders property data", () => {
    const fakeProperty = {
        L_ListingID: "1234567890",
        L_Address: "123 Main St",
        L_City: "Oroville",
        L_State: "CA",
        L_SystemPrice: 500000,
        L_Keyword2: 3,
        LM_Dec_3: 2,
        LM_Int2_3: 1800,
        L_Photos: "[]"
    }

    render(<PropertyCard property={fakeProperty} />)

    expect(screen.getByText("$500,000")).toBeInTheDocument()
    expect(screen.getByText("123 Main St")).toBeInTheDocument()
    expect(screen.getByText("Oroville, CA")).toBeInTheDocument()
    expect(screen.getByText("3 beds |")).toBeInTheDocument()
    expect(screen.getByText("2 baths |")).toBeInTheDocument()
    expect(screen.getByText("1800 sqft")).toBeInTheDocument()
})