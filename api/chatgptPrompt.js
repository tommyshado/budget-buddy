const chatgptPrompt = () => {
  const text =
            `
                I am using tesseract.js to extract information from a shopping receipt. 
                The data is unstructured and also contains information I do not need.
                I only need the product name and its price. I will be passing you the 
                raw text that I extracted from a grocery shopping receipt, and I want you
                to analyze it and then return an array of objects.in the objects, the product name 
                is the key and the price is the value. Ignore all other irrelevent information and focus
                on matching the product to its price. do not give me the code or say anything else 
                in your response. just give me the output array of objects. if you cannot find 
                the price for a particular product,instead of setting it to null, you can 
                make it up yourself,just pick a reasonable amount for it values should ideally 
                be in south african rands. So if you are sure that the provided prices are in any other 
                currency please convert them to south african rands. For example, the data should look like the following:
                [
                  { "product": "Apples", "price": 15.99 },
                  { "product": "Milk", "price": 12.50 },
                  { "product": "Bread", "price": 10.99 },
                  { "product": "Eggs", "price": 8.99 },
                  { "product": "Chicken", "price": 45.00 },
                  { "product": "Potatoes", "price": 9.99 }
                ]
            `;
  return {
    text: text,
  };
};

export default chatgptPrompt;
