describe("Blog-app", () => {
    beforeEach(function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`)
        const user = {
            name: "Test Test",
            username: "test",
            password: "test"
        }
        cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user)
        cy.visit("")
    })

    it("frontpage can be opened", () => {
        cy.contains("Blog-app")
        cy.contains("Login")
    })

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.contains("Login").click()
            cy.get("#username-input").type("test")
            cy.get("#password-input").type("test")
            cy.get("#submit-login").click()
            cy.contains("Logged in as: Test Test")
        })

        it("fails with wrong credentials", function () {
            cy.contains("Login").click()
            cy.get("#username-input").type("test")
            cy.get("#password-input").type("wrongpassword")
            cy.get("#submit-login").click()
            cy.get("[data-test=\"notification\"]")
                .should("contain", "Unauthorized")
                .and("have.css", "color", "rgb(255, 0, 0)")
        })
    })

    describe("When logged in", () => {
        beforeEach(function () {
            cy.login({ username: "test", password: "test" })
        })

        it("a blog can be added", () => {
            cy.contains("Add blog").click()
            cy.get("#title-input").type("test title")
            cy.get("#url-input").type("testurl.com")
            cy.get("#blog-submit").click()
            cy.contains("test title")
        })

        it("blogs are correctly ordered by likes", () => {
            cy.createBlog({
                title: "Blog with no likes",
                author: "Test Test",
                url: "test.com"
            })
            cy.createBlog({
                title: "Blog with 1 likes",
                author: "Test Test",
                url: "test.com"
            })
            cy.createBlog({
                title: "Blog with 2 likes",
                author: "Test Test",
                url: "test.com"
            })
            cy.get("[data-test=\"view-button\"]")
                .click({ multiple: true })

            cy.contains("Blog with 1 likes").parent().parent().find("[data-test=\"like\"]").click()
            cy.contains("Blog with 2 likes").parent().parent().find("[data-test=\"like\"]").click()
            cy.contains("Blog with 2 likes").parent().parent().find("[data-test=\"like\"]").click()
            cy.visit("")
            cy.get("[data-test=\"blog\"]").eq(0).should("contain", "Blog with 2 likes")
            cy.get("[data-test=\"blog\"]").eq(1).should("contain", "Blog with 1 likes")
            cy.get("[data-test=\"blog\"]").eq(2).should("contain", "Blog with no likes")
        })

        describe("with an existing blog", () => {
            beforeEach(function () {
                cy.createBlog({
                    title: "Existing blog",
                    author: "Test Test",
                    url: "https://test.com"
                })
            })

            it("user can like a blog", () => {
                cy.get("[data-test=\"view-button\"]").click()
                cy.contains("0 likes")
                cy.get("[data-test=\"like\"]").click()
                cy.contains("1 likes")
            })

            it("user can delete own blog", () => {
                cy.get("[data-test=\"view-button\"]").click()
                cy.get("[data-test=\"remove-button\"]").click()
                cy.contains("Blog deleted")
            })

            it("other user can't see the remove button", () => {
                const user2 = {
                    name: "Test Test2",
                    username: "test2",
                    password: "test2"
                }
                cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user2)
                cy.login({ username: "test2", password: "test2" })
                cy.contains("Test Test2")
                cy.get("[data-test=\"view-button\"]").click()
                cy.contains("Remove").should("not.exist")
            })
        })
    })
})