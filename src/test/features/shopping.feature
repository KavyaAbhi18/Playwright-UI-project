Feature: Verfiyin the shopping orders

@Test @Inventory 
Scenario: Purchase an iten and varify that it shows in the order list
         Given User is on "Welcome to SchemeServe QA Tech Test" page
         And User go to "Catalogue" page
         And User selects an puchasing item from the dropdown
         And User clicks on purchase button
         And User provides the Quantity
         And User clicks on "Submit" button
         When User go to "Inventory" page
         Then User should see the newly purchased item displayed as purchased
         And User verifies that the items have not been purchased are marked as "not purchased"

@Test @RemoveQuantity
Scenario: User removes the quantilty of an item purchase and verifie it reflect in the Inventory page
      Given User go to "Inventory" page
      And User selects the previously ordered item
      When User removes the quantity 
      Then User should see the updated quantity in the inventory page

@Makepurchase
Scenario Outline: User does multiple purchase and verifies all are showing in the Inventory page
      Given User go to "Catalogue" page
      And User selects "<Products>" from dropdown
      And User clicks on purchase button
      And User provides the Quantity as "<Quantity>"
      Then User clicks on "Submit" button
      When User go to "Inventory" page
      Then User should see that the "<Products>" with quantity "<quantilty>" is displayed as purchased
       

       Examples:
       | Products                     | Quantity |
       | Milk Frother                 | 25       |
       | Espresso Machine Cleaner     | 3        |
       | Coffee Grinder               | 4        |
@Test @Report
Scenario: Verify that the report is filtered
        Given User go to "Reports" page
        And User click "General Ledger" tab
        When User serach the word "Cash"
        Then Report should show the "Cash" filtered data

@Test @Contact
Scenario: Verfiy the contact page
        Given User go to "Contact Form" page
        #There is no require text or symbol to verify this 
        #And Verify that the "First Name", "Last Name" and "Terms of Service" checkboxs are required
        When User provide those data 
        And User clicks on "Submit" button
