import React from "react"
import { expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import styles from "./Blog.module.css"

describe("A single blog item", () => {
    test("At start, only blogs name is rendered ", () => {
        const blog = {
            title: "Test title", likes: 42, author: "Test author",
            url: "https://test.url"
        }

        render(<Blog blog={blog} />)

        expect(screen.getByText("Test title")).toBeDefined()
        expect(screen.queryByText("Test author")).toBeNull()
        expect(screen.queryByText("42")).toBeNull()
        expect(screen.queryByText("https://test.url")).toBeNull()
    })

    test("Blogs URL and likes are shown after clicking view", async () => {
        const blog = {
            title: "Test title", likes: 42, author: "Test author",
            url: "https://test.url", user: { id: "testid" }
        }

        const user = {
            id: "testid"
        }

        render(<Blog blog={blog} user={user} />)

        expect(screen.queryByText("42")).toBeNull()

        const testEvent = userEvent.setup()
        await testEvent.click(screen.getByText("view"))

        expect(screen.queryByText("Test author")).toBeDefined()
        expect(screen.queryByText("42")).toBeDefined()
        expect(screen.queryByText("https://test.url")).toBeDefined()
    })
})

test("Clicking like 2 times times calls setLikes twice", async () => {
    const setLikesMock = vi.fn()

    const blog = {
        title: "Test title", likes: 42, author: "Test author",
        url: "https://test.url", user: { id: "hfu43i4t84h3k" }
    }

    const user = {
        id: "hfu43i4t84h3k"
    }

    render(<Blog blog={blog} user={user} setLikes={setLikesMock} />)
    const testEvent = userEvent.setup()

    await testEvent.click(screen.getByText("view"))
    await testEvent.click(screen.getByText("Like"))
    await testEvent.click(screen.getByText("Like"))

    expect(setLikesMock.mock.calls).toHaveLength(2)
})
