# Tynput
The Tynput is now going to be like this:
* Tynput Component (stores the nitty-gritty input)
* Tynput Test -- You instantiate a component with this, and then it interacts with the test through keyboard events (typed key etc) -- it's super minimalist
* The Tynput Test will be literally integrated with `TestResult`, so essentially you have something like:
```jsx
<Tynput test={new KeyboardChar()} />
```

## Tynput Test
The Tynput Test will handle all the visuals. Maybe.
Here are the requirements

## 1. Scrollable Input
For the future like timed tests, we need to scroll up through the input. Might be useful as well for the code snippet fun.

## 2. Modifiable Word Input
Be able to programmatically add/remove words (lookahead, single word) -- in fact for single word maybe even have extensible css (larger words, WPM preview etc). This brings us to our next point.

## 3. Extensible DOM
Be able to add HUD and pace caret, for example pinyin and such

## 4. Parent Extensible
The parent (tynput) should be able to control if it is out of focus, and restarting tests -- and also repeating tests. A way to access the test data and provide operations on it will be crucial.

# Routes
If it is possible for a special util route be placed, it will be placed. If not, no worries :)