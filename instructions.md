create react app using terminal 
adjust the files so that only necessary files are in application (take out unnecessary ones)
go to app.js and edit the game within the app function
    create the table/board of 64 boxes with 1 random color per box
    create array of colors used for the game
    inside app function, create board using 'for' loop 
    inside the loop, create a random color generator
    using states through react, create a state and update state
move index css and create the visual app board for the color use flex displays

using states, create column and row checks by taking the indexes of each square and seeing if they match to either next to, below each other
for rows, integrate that there are null indexes/not valid squares that can wrap a row of 3 and 4 matching - create exceptions to these
create an interval set and clear interval so that board is constantly being checked for matches/moves

create the moveSquare to move the empty segments/boxes to fill with new random generated color so that board is constantly being filled
    first row should randomly generate new color if it's empty, while rows below first row should drop the existing color down per width amount 

create the drag features under the img div game - note that the data id to onDragEnd are looked up through various methods (and I still have minimal knowledge of how most of those inputs are working)
    draggable = true I do however, understand... it's the (e) to e.preventDefault that is still a bit hazy
    console logging the drag/clickhold start, drop, and end

setting the color switch from the dragged/drop selection to what it was dropped into - essentially switching the colors from the mouseDrag to the new target location using e.target with functions for drag drop.
    restrict the drag feature to only 1 space either vertically or horizontally - nothing more
    create array of valid move set list - +/- width for vertically or +/- 1 for horizontally correct moves
        include a boolean true for the column and row of 3 and 4  - includes checks 

add images to a image folder, then replace the string values of colors in the original color array with the links to imported images
go back and replace the styles inlines with 'source'/src related links so that images sync with their corresponding colors
include a blank png image for the '' sections of code where there's a gap in images

create a scoreboard under a component folder titled 'scoreboard' - this will be used for the scoreboard JS 
    note that we can also go back and do the game board, the images used for the candies as separate components, but I'm new, and a noob. So this is how I'm working it as of now!  O:)
    when adding the scoreboard, we use the very bottom outside of the game board so that score is not added inside the game board.

go back to score system and edit out the blank 3 and 4 rows by adding is not ! function to the blank rows - add to each col and row check to ensure those scores are not added