# Internet Store: Dynamic Data Rendering and CRUD Operations Demo

## Project Overview

This project serves as a demonstration of an **Internet Store** application, focusing on two core functional areas:

1. **Dynamic Rendering** of products based on data fetched from a remote database.

2. Full **CRUD** (Create, Read, Update, Delete) functionality for managing the product database.

## Key Features

- **Dynamic Catalog:** On the "**застосування**" (Application/Use) page, all product listings are dynamically rendered using up-to-date information from the remote database.

- **Smart Filtering:** Users can easily filter products by their **application/purpose** by clicking on the relevant cards.

- **Product Details Page:** Detailed information about the selected product is also rendered dynamically, ensuring data freshness.

## Admin Panel Access (CRUD)

To gain the ability to add, modify, or delete products in the database, you must log in as an administrator.

1. Click on the **"Login"** link.

2. Use the following test credentials:

| Parameter    | Value           |
| ------------ | --------------- |
| **Email**    | `test@test.com` |
| **Password** | `123456`        |

After a successful login, the data management form will become available, and changes will be instantly reflected on the "застосування" page.

## How to Manage Products

After logging in, you will see forms for performing CRUD operations:

### Add a New Product

1. Fill out the corresponding form fields.

2. To display the product image in the **"image filepath"** field (Image File Path), enter the **file name along with its extension**, provided the file is stored in one of the project's folders.

3. **Demonstration Example:** You can use the file names `"Hotap_02.png"` or `"Hotap_04.png"` to display test images.

### Update (Change) a Product

1. Fill in the fields you wish to change (e.g., price, description).

2. **You must** specify the **ID** of the product that was assigned to it upon creation.

### Delete a Product

1. Enter the **ID** of the product you want to delete into the corresponding form field.
