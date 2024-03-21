exports.getTest = (req, res) => {
  try {
    // You can add any logic or data processing here
    const testData = {
      message: 'Hello, World!',
      timestamp: new Date().toISOString(),
    };

    // Send the test data as a JSON response
    res.status(200).json(testData);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};