# Task 1 - Autocomplete

##  Task overview

Create a function that, by a given array of strings, creates an autocomplete dropdown list

*   The function takes two parameters:
    *   A **selector** that can be any CSS3 selector: 
        *   By id -`#id`
        *   By class - `.class`
        *   By node type - `div`
        *   Or nested selectors - `#this .is a .nested.selector`
    *   A suggestions array
        *   Array of strings
        *   **optional**, may not be provided

The following must be implemented:

*   Adding a suggestion for each element from the suggestions array 
*   Entering a string for autocomplete
    *   Any suggestion that does not contain the autocomplete string must be hidden
    *   When the autocomplete string is empty, all suggestions must be hidden
*   Adding a new string for suggestion
    *   Clicking the "Add" button, must add the string from the autocomplete to the suggestions
        *   If the new suggestion is already contained in the suggestions, skip it
        *   A suggestion can be contained only once
*   Selecting a suggestion
    *   Selecting a suggestion from the suggestions must be filled in the autocomplete input
