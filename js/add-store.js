app.post('/add-store', async (req, res) => {
    const { storeName, storeDescription, storeLocation, storeImage } = req.body;
    const newStore = new Store({
        name: storeName,
        description: storeDescription,
        location: storeLocation,
        image: storeImage,
    });

    try {
        await newStore.save();
        res.status(200).send('Store added successfully!');
    } catch (error) {
        console.error('Error saving store:', error);
        res.status(500).send('Error saving store to MongoDB: ' + error.message);
    }
});
