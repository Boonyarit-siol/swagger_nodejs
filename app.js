const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Define your API routes and logic
let items = [
    { id: 1, name: "Item1" },
    { id: 2, name: "Item2" },
    { id: 3, name: "Item3" }
];

app.use(express.json());

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Configure Swagger documentation options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Documentation",
            version: '1.0.0',
            description: 'A simple API documentation'
        },
        servers: [
            {
                url: "http://localhost:3000", // Replace with your actual server URL
            },
        ],
    },
    apis: ['app.js'], // List the files where your API routes are defined
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation using Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get a list of items
 *     description: Retrieve a list of items from the server.
 *     responses:
 *       200:
 *         description: A list of items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/api/items', (req, res) => {
    res.json(items);
});
/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Add a new item
 *     description: Add a new item to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly added item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
app.post('/api/items', (req, res) => {
    // Your route logic here
});
/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an item
 *     description: Update the details of an existing item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Item not found.
 */
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = {
        id,
        name: req.body.name,
    };

    // Update item logic here

    res.json(updatedItem);
});
/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     description: Delete an existing item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to delete.
 *     responses:
 *       204:
 *         description: Item successfully deleted.
 *       404:
 *         description: Item not found.
 */
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Delete item logic here

    res.status(204).send();
});
