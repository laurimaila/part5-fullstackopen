import React from "react"
import { expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

describe("<BlogForm />", () => {
    test("Calls createBlog with correct parameters on submit", async () => {
        const createBlogMock = vi.fn()
        const testEvent = userEvent.setup()

        render(<BlogForm createBlog={createBlogMock} />)
        const input = screen.getByPlaceholderText("Title")
        const input2 = screen.getByPlaceholderText("url")
        await testEvent.type(input, "Input test title")
        await testEvent.type(input2, "test.url")
        await testEvent.click(screen.getByText("Save blog"))

        expect(createBlogMock.mock.calls).toHaveLength(1)
        expect(createBlogMock.mock.calls[0][0].title).toBe("Input test title")
        expect(createBlogMock.mock.calls[0][0].url).toBe("https://test.url")
    })
})