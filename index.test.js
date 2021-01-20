test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

//FOR ACTUAL TESTS I WANT TO RUN

/*
In my index.jsx file, I need to test that:
-my get request returns some data
-the sorting methods I define all work
-the star filtering method I created works
-the math doing function I created works
-the 'load more reviews' button loads more reviews, without repeating any

Generally I would test that:
-My server is rendering my app without crashing
-That the correct DOM tree is created matching the data from my GET request


How I would do this

I know there should be a better way to do this, but for the simple testing of the functionality of my index.jsx file, I could copy the functions I want to test over here and refactor a little so they run in just pure js, feed them sample input, and test the output against what I want it to look like.

I think I could make that easier on myself by installing and configuring Enzyme, I think importing the file I want to test, mocking some data, and then testing the imported file's sort/render/etc functions against my mocked data and my expected output. This would be similar to above except without copying and refactoring.

The AJAX request part I think should be easy to test - I'd just make an AJAX request over here, look at the data, assert that it 1) exists, 2) has the correct length, and 3) is in the correct format.

I can test the server rendering with the shallow(<index.jsx>) language

I'm not sure what the right way to test the tree is. I think I could feed my app some sample data of predetermined length, and traverse the DOM tree, counting each individual review, and assert that it is equal to the number of reviews I fed the App.
*/