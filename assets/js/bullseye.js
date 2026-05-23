const CATEGORY_PAIRS = [
  { id: 'faces', name: 'Who Am I?', numbers: [20, 1, 18], double: 18 },
  { id: 'places', name: 'Places', numbers: [18, 4, 13], double: 13 },
  { id: 'sport', name: 'Sport', numbers: [13, 6, 10], double: 6 },
  { id: 'showbiz', name: 'Showbiz', numbers: [2, 15, 10], double: 10 },
  { id: 'spelling', name: 'Spelling', numbers: [15, 2, 17], double: 17 },
  { id: 'science', name: 'Science', numbers: [17, 3, 19], double: 3 },
  { id: 'history', name: 'History', numbers: [19, 7, 16], double: 16 },
  { id: 'books', name: 'Books', numbers: [16, 8, 11], double: 8 },
  { id: 'words', name: 'Words', numbers: [11, 14, 9], double: 14 },
  { id: 'britain', name: 'Britain', numbers: [9, 12, 5], double: 12 },
];

const STANDARD_NUMBERS = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

const PRIZE_ENGINE = {
  low_tier: ['Hostess Trolley', 'Teasmade', 'SodaStream', 'Canteen of Cutlery', 'Twin-tub Washing Machine', '8-Piece Luggage Set'],
  mid_tier: ['Portable Colour TV', 'VCR Player', 'Electric Lawnmower', 'Sunlounger Set'],
  star_prizes: ['16ft Speedboat', 'Caravan', 'Fiat Uno', 'Holiday in the Algarve', 'Fitted Kitchen'],
};

const QUESTION_HISTORY_KEY = 'dartbot_bullseye_question_history_v1';

const FALLBACK_QUESTIONS = {
  faces: [
    { question: 'Which actor played Del Boy in Only Fools and Horses?', correct_answer: 'David Jason', incorrect_answers: ['Nicholas Lyndhurst', 'John Cleese', 'Ronnie Barker'] },
    { question: 'Who played Mr Bean on television?', correct_answer: 'Rowan Atkinson', incorrect_answers: ['Hugh Laurie', 'Stephen Fry', 'Ricky Gervais'] },
    { question: 'Which singer is known as the Rocket Man?', correct_answer: 'Elton John', incorrect_answers: ['Robbie Williams', 'George Michael', 'Tom Jones'] },
    { question: 'Who was the first woman to serve as UK Prime Minister?', correct_answer: 'Margaret Thatcher', incorrect_answers: ['Theresa May', 'Barbara Castle', 'Harriet Harman'] },
  ],
  places: [
    { question: 'Which city is home to the Clifton Suspension Bridge?', correct_answer: 'Bristol', incorrect_answers: ['Bath', 'Cardiff', 'Exeter'] },
    { question: 'Ben Nevis is in which country?', correct_answer: 'Scotland', incorrect_answers: ['Wales', 'England', 'Ireland'] },
    { question: 'Which UK city is famous for the Cavern Club and The Beatles?', correct_answer: 'Liverpool', incorrect_answers: ['Manchester', 'Leeds', 'Birmingham'] },
    { question: 'Which seaside town is famous for its tower and illuminations?', correct_answer: 'Blackpool', incorrect_answers: ['Brighton', 'Skegness', 'Margate'] },
    { question: 'Which European capital city is divided by the River Spree?', correct_answer: 'Berlin', incorrect_answers: ['Paris', 'Rome', 'London'] },
    { question: 'Mount Everest is located in which mountain range?', correct_answer: 'Himalayas', incorrect_answers: ['Andes', 'Alps', 'Rockies'] },
    { question: 'Which country is home to the Great Barrier Reef?', correct_answer: 'Australia', incorrect_answers: ['Indonesia', 'Philippines', 'Mexico'] },
    { question: 'The Colosseum is an ancient amphitheatre in which city?', correct_answer: 'Rome', incorrect_answers: ['Athens', 'Istanbul', 'Cairo'] },
    { question: 'Which desert is the largest hot desert in the world?', correct_answer: 'Sahara Desert', incorrect_answers: ['Gobi Desert', 'Arabian Desert', 'Kalahari Desert'] },
    { question: 'Which river flows through London?', correct_answer: 'River Thames', incorrect_answers: ['River Severn', 'River Mersey', 'River Clyde'] },
    { question: 'What is the capital city of Canada?', correct_answer: 'Ottawa', incorrect_answers: ['Toronto', 'Vancouver', 'Montreal'] },
    { question: 'Which famous landmark is located in Paris, France?', correct_answer: 'Eiffel Tower', incorrect_answers: ['Big Ben', 'Statue of Liberty', 'Leaning Tower of Pisa'] },
    { question: 'The Grand Canyon is primarily located in which US state?', correct_answer: 'Arizona', incorrect_answers: ['California', 'Nevada', 'Utah'] },
    { question: 'Which city is known as the "Big Apple"?', correct_answer: 'New York City', incorrect_answers: ['Los Angeles', 'Chicago', 'Boston'] },
    { question: 'Which country is famous for its fjords?', correct_answer: 'Norway', incorrect_answers: ['Sweden', 'Finland', 'Denmark'] },
    { question: 'What is the capital city of Japan?', correct_answer: 'Tokyo', incorrect_answers: ['Kyoto', 'Osaka', 'Seoul'] },
    { question: 'Which ancient city was buried by the eruption of Mount Vesuvius?', correct_answer: 'Pompeii', incorrect_answers: ['Herculaneum', 'Ostia', 'Syracuse'] },
    { question: 'Which continent is the Amazon Rainforest primarily located in?', correct_answer: 'South America', incorrect_answers: ['Africa', 'Asia', 'North America'] },
    { question: 'What is the capital city of Germany?', correct_answer: 'Berlin', incorrect_answers: ['Munich', 'Hamburg', 'Frankfurt'] },
    { question: 'Which famous wall stretches across northern China?', correct_answer: 'Great Wall of China', incorrect_answers: ['Hadrian\'s Wall', 'Berlin Wall', 'Wailing Wall'] },
    { question: 'Which city is home to the Sydney Opera House?', correct_answer: 'Sydney', incorrect_answers: ['Melbourne', 'Brisbane', 'Perth'] },
    { question: 'What is the longest river in the world?', correct_answer: 'River Nile', incorrect_answers: ['Amazon River', 'Yangtze River', 'Mississippi River'] },
    { question: 'Which country is known for its pyramids?', correct_answer: 'Egypt', incorrect_answers: ['Mexico', 'Peru', 'China'] },
    { question: 'What is the capital city of Italy?', correct_answer: 'Rome', incorrect_answers: ['Milan', 'Venice', 'Florence'] },
    { question: 'Which ocean is the largest?', correct_answer: 'Pacific Ocean', incorrect_answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'] },
    { question: 'Which city is famous for its canals and gondolas?', correct_answer: 'Venice', incorrect_answers: ['Amsterdam', 'Bruges', 'Stockholm'] },
    { question: 'What is the capital city of Spain?', correct_answer: 'Madrid', incorrect_answers: ['Barcelona', 'Seville', 'Valencia'] },
    { question: 'Which mountain is the highest in Africa?', correct_answer: 'Mount Kilimanjaro', incorrect_answers: ['Mount Kenya', 'Mount Stanley', 'Mount Meru'] },
    { question: 'Which country is home to the Taj Mahal?', correct_answer: 'India', incorrect_answers: ['Pakistan', 'Bangladesh', 'Nepal'] },
    { question: 'What is the capital city of Russia?', correct_answer: 'Moscow', incorrect_answers: ['Saint Petersburg', 'Kiev', 'Warsaw'] },
    { question: 'Which sea separates the UK from mainland Europe?', correct_answer: 'North Sea', incorrect_answers: ['English Channel', 'Irish Sea', 'Celtic Sea'] },
    { question: 'Which city is known for its Golden Gate Bridge?', correct_answer: 'San Francisco', incorrect_answers: ['Los Angeles', 'Seattle', 'Portland'] },
    { question: 'What is the capital city of China?', correct_answer: 'Beijing', incorrect_answers: ['Shanghai', 'Hong Kong', 'Guangzhou'] },
    { question: 'Which country is famous for its kangaroos and koalas?', correct_answer: 'Australia', incorrect_answers: ['New Zealand', 'South Africa', 'Canada'] },
    { question: 'What is the capital city of Brazil?', correct_answer: 'Brasília', incorrect_answers: ['Rio de Janeiro', 'São Paulo', 'Buenos Aires'] },
    { question: 'Which famous waterfall is located on the border of Zambia and Zimbabwe?', correct_answer: 'Victoria Falls', incorrect_answers: ['Niagara Falls', 'Angel Falls', 'Iguazu Falls'] },
    { question: 'What is the capital city of South Africa?', correct_answer: 'Pretoria', incorrect_answers: ['Cape Town', 'Johannesburg', 'Durban'] },
    { question: 'Which island nation is known as the "Land of the Rising Sun"?', correct_answer: 'Japan', incorrect_answers: ['China', 'South Korea', 'Vietnam'] },
    { question: 'What is the capital city of Mexico?', correct_answer: 'Mexico City', incorrect_answers: ['Guadalajara', 'Monterrey', 'Cancun'] },
    { question: 'Which famous desert is located in Chile and Peru?', correct_answer: 'Atacama Desert', incorrect_answers: ['Patagonian Desert', 'Mojave Desert', 'Great Basin Desert'] },
    { question: 'What is the capital city of Argentina?', correct_answer: 'Buenos Aires', incorrect_answers: ['Santiago', 'Lima', 'Montevideo'] },
    { question: 'Which European country is famous for its windmills and tulips?', correct_answer: 'Netherlands', incorrect_answers: ['Belgium', 'Germany', 'France'] },
    { question: 'What is the capital city of Sweden?', correct_answer: 'Stockholm', incorrect_answers: ['Oslo', 'Copenhagen', 'Helsinki'] },
    { question: 'Which famous ancient ruins are located in Peru?', correct_answer: 'Machu Picchu', incorrect_answers: ['Chichen Itza', 'Petra', 'Angkor Wat'] },
    { question: 'What is the capital city of Greece?', correct_answer: 'Athens', incorrect_answers: ['Thessaloniki', 'Patras', 'Heraklion'] },
    { question: 'Which country is home to the Serengeti National Park?', correct_answer: 'Tanzania', incorrect_answers: ['Kenya', 'South Africa', 'Botswana'] },
    { question: 'What is the capital city of Portugal?', correct_answer: 'Lisbon', incorrect_answers: ['Porto', 'Faro', 'Coimbra'] },
    { question: 'Which famous river flows through Paris?', correct_answer: 'River Seine', incorrect_answers: ['River Loire', 'River Rhône', 'River Garonne'] },
    { question: 'What is the capital city of Ireland?', correct_answer: 'Dublin', incorrect_answers: ['Cork', 'Galway', 'Limerick'] },
  ],
  sport: [
    { question: 'How many players start on the pitch for one football team?', correct_answer: '11', incorrect_answers: ['10', '12', '9'] },
    { question: 'The Ashes is contested in which sport?', correct_answer: 'Cricket', incorrect_answers: ['Rugby Union', 'Darts', 'Snooker'] },
    { question: 'In darts, what score is a treble 20 worth?', correct_answer: '60', incorrect_answers: ['40', '50', '80'] },
    { question: 'Which colour is the bullseye on a standard dartboard?', correct_answer: 'Red', incorrect_answers: ['Green', 'Black', 'Yellow'] },
    { question: 'Which country won the FIFA World Cup in 2022?', correct_answer: 'Argentina', incorrect_answers: ['France', 'Brazil', 'Germany'] },
    { question: 'How many points is a touchdown worth in American Football?', correct_answer: '6', incorrect_answers: ['3', '7', '1'] },
    { question: 'Which British tennis player won Wimbledon in 2013 and 2016?', correct_answer: 'Andy Murray', incorrect_answers: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic'] },
    { question: 'In which sport would you perform a "slam dunk"?', correct_answer: 'Basketball', incorrect_answers: ['Volleyball', 'Handball', 'Netball'] },
    { question: 'Which legendary boxer was known as "The Greatest"?', correct_answer: 'Muhammad Ali', incorrect_answers: ['Mike Tyson', 'George Foreman', 'Joe Frazier'] },
    { question: 'How many bases are there in a game of baseball?', correct_answer: '4', incorrect_answers: ['3', '5', '6'] },
    { question: 'Which sport uses a shuttlecock?', correct_answer: 'Badminton', incorrect_answers: ['Tennis', 'Squash', 'Table Tennis'] },
    { question: 'What is the maximum score you can achieve with three darts in a single turn?', correct_answer: '180', incorrect_answers: ['170', '160', '150'] },
    { question: 'Which country is famous for the Haka dance performed before rugby matches?', correct_answer: 'New Zealand', incorrect_answers: ['Australia', 'South Africa', 'Fiji'] },
    { question: 'In golf, what is it called when you complete a hole in one stroke under par?', correct_answer: 'Birdie', incorrect_answers: ['Eagle', 'Bogey', 'Albatross'] },
    { question: 'Which sport involves a "strike" and a "spare"?', correct_answer: 'Bowling', incorrect_answers: ['Billiards', 'Snooker', 'Pool'] },
    { question: 'Which famous cycling race takes place annually in France?', correct_answer: 'Tour de France', incorrect_answers: ['Giro d\'Italia', 'Vuelta a España', 'Paris-Roubaix'] },
    { question: 'How many rings are on the Olympic flag?', correct_answer: '5', incorrect_answers: ['4', '6', '7'] },
    { question: 'Which martial art originated in Korea?', correct_answer: 'Taekwondo', incorrect_answers: ['Karate', 'Judo', 'Kung Fu'] },
    { question: 'What is the name of the trophy awarded to the winner of the Premier League?', correct_answer: 'Premier League Trophy', incorrect_answers: ['FA Cup', 'League Cup', 'Community Shield'] },
    { question: 'Which swimming stroke is named after an insect?', correct_answer: 'Butterfly', incorrect_answers: ['Freestyle', 'Backstroke', 'Breaststroke'] },
    { question: 'In snooker, what colour ball is worth 7 points?', correct_answer: 'Black', incorrect_answers: ['Pink', 'Blue', 'Green'] },
    { question: 'Which sport is played at Lord\'s Cricket Ground?', correct_answer: 'Cricket', incorrect_answers: ['Football', 'Rugby', 'Tennis'] },
    { question: 'What is the term for a tie in a football match?', correct_answer: 'Draw', incorrect_answers: ['Win', 'Loss', 'Stalemate'] },
    { question: 'Which country has won the most Rugby World Cups?', correct_answer: 'South Africa', incorrect_answers: ['New Zealand', 'Australia', 'England'] },
    { question: 'In athletics, what is a "decathlon"?', correct_answer: '10 events', incorrect_answers: ['5 events', '7 events', '12 events'] },
    { question: 'Which sport uses a puck?', correct_answer: 'Ice Hockey', incorrect_answers: ['Field Hockey', 'Lacrosse', 'Bandy'] },
    { question: 'What is the name of the annual horse race held in Liverpool?', correct_answer: 'Grand National', incorrect_answers: ['Cheltenham Gold Cup', 'Epsom Derby', 'Royal Ascot'] },
    { question: 'Which sport is associated with the term "love" for a score of zero?', correct_answer: 'Tennis', incorrect_answers: ['Badminton', 'Squash', 'Table Tennis'] },
    { question: 'How many players are on a rugby union team?', correct_answer: '15', incorrect_answers: ['13', '11', '7'] },
    { question: 'Which famous golf tournament is held annually at Augusta National Golf Club?', correct_answer: 'The Masters', incorrect_answers: ['The Open Championship', 'US Open', 'PGA Championship'] },
    { question: 'What is the name of the governing body for international football?', correct_answer: 'FIFA', incorrect_answers: ['UEFA', 'CAF', 'CONMEBOL'] },
    { question: 'Which sport involves a "try" and a "conversion"?', correct_answer: 'Rugby', incorrect_answers: ['American Football', 'Australian Rules Football', 'Gaelic Football'] },
    { question: 'In darts, what is the outer ring of the board called?', correct_answer: 'Double', incorrect_answers: ['Treble', 'Single', 'Bull'] },
    { question: 'Which country is known for its sumo wrestling?', correct_answer: 'Japan', incorrect_answers: ['China', 'South Korea', 'Mongolia'] },
    { question: 'What is the name of the fastest swimming stroke?', correct_answer: 'Freestyle', incorrect_answers: ['Breaststroke', 'Backstroke', 'Butterfly'] },
    { question: 'Which sport uses a wicket?', correct_answer: 'Cricket', incorrect_answers: ['Baseball', 'Rounders', 'Softball'] },
    { question: 'What is the term for a perfect game in bowling?', correct_answer: '300', incorrect_answers: ['200', '250', '280'] },
    { question: 'Which sport is played on a court with a net and a racket?', correct_answer: 'Tennis', incorrect_answers: ['Badminton', 'Squash', 'Table Tennis'] },
    { question: 'How many periods are there in an ice hockey game?', correct_answer: '3', incorrect_answers: ['2', '4', '5'] },
    { question: 'Which famous marathon is run in the capital city of England?', correct_answer: 'London Marathon', incorrect_answers: ['Boston Marathon', 'New York City Marathon', 'Berlin Marathon'] },
    { question: 'In darts, what is the score for hitting the outer bull?', correct_answer: '25', incorrect_answers: ['50', '10', '20'] },
    { question: 'Which sport involves a "scrum"?', correct_answer: 'Rugby', incorrect_answers: ['American Football', 'Soccer', 'Australian Rules Football'] },
    { question: 'What is the name of the governing body for international athletics?', correct_answer: 'World Athletics', incorrect_answers: ['IAAF', 'IOC', 'WADA'] },
    { question: 'Which sport is played with a cue stick and balls on a table?', correct_answer: 'Pool', incorrect_answers: ['Snooker', 'Billiards', 'Carom'] },
    { question: 'How many sets are typically played in a men\'s Grand Slam tennis final?', correct_answer: '5', incorrect_answers: ['3', '4', '6'] },
    { question: 'Which sport is known as "the beautiful game"?', correct_answer: 'Football', incorrect_answers: ['Basketball', 'Tennis', 'Cricket'] },
    { question: 'What is the name of the annual boat race between Oxford and Cambridge universities?', correct_answer: 'The Boat Race', incorrect_answers: ['Henley Royal Regatta', 'Cowes Week', 'America\'s Cup'] },
  ],
  showbiz: [
    { question: 'Which band released Bohemian Rhapsody?', correct_answer: 'Queen', incorrect_answers: ['The Beatles', 'Oasis', 'ABBA'] },
    { question: 'Which film features the line "You were only supposed to blow the bloody doors off"?', correct_answer: 'The Italian Job', incorrect_answers: ['Get Carter', 'Zulu', 'Goldfinger'] },
    { question: 'Which TV soap is set in Albert Square?', correct_answer: 'EastEnders', incorrect_answers: ['Coronation Street', 'Emmerdale', 'Hollyoaks'] },
    { question: 'Which British talent show features the golden buzzer?', correct_answer: "Britain's Got Talent", incorrect_answers: ['The Chase', 'Pointless', 'Mastermind'] },
    { question: 'Who played James Bond in "Casino Royale"?', correct_answer: 'Daniel Craig', incorrect_answers: ['Pierce Brosnan', 'Sean Connery', 'Roger Moore'] },
    { question: 'Which actress is known for her role as Hermione Granger in the Harry Potter films?', correct_answer: 'Emma Watson', incorrect_answers: ['Bonnie Wright', 'Evanna Lynch', 'Katie Leung'] },
    { question: 'Which TV show is set in the fictional town of Springfield?', correct_answer: 'The Simpsons', incorrect_answers: ['Family Guy', 'South Park', 'American Dad!'] },
    { question: 'Who sang the hit song "Rolling in the Deep"?', correct_answer: 'Adele', incorrect_answers: ['Duffy', 'Amy Winehouse', 'Jessie J'] },
    { question: 'Which film won the Academy Award for Best Picture in 2020?', correct_answer: 'Parasite', incorrect_answers: ['1917', 'Joker', 'Once Upon a Time in Hollywood'] },
    { question: 'Which actor is famous for his role as Captain Jack Sparrow?', correct_answer: 'Johnny Depp', incorrect_answers: ['Orlando Bloom', 'Geoffrey Rush', 'Keira Knightley'] },
    { question: 'Which TV series is set in Westeros and Essos?', correct_answer: 'Game of Thrones', incorrect_answers: ['The Witcher', 'Vikings', 'The Last Kingdom'] },
    { question: 'Who is known as the "King of Pop"?', correct_answer: 'Michael Jackson', incorrect_answers: ['Elvis Presley', 'Prince', 'Freddie Mercury'] },
    { question: 'Which film features a blue alien race called the Na\'vi?', correct_answer: 'Avatar', incorrect_answers: ['Star Wars', 'Guardians of the Galaxy', 'Dune'] },
    { question: 'Which British comedian is known for his character Ali G?', correct_answer: 'Sacha Baron Cohen', incorrect_answers: ['Ricky Gervais', 'Russell Brand', 'James Corden'] },
    { question: 'Which TV show follows the lives of six friends in New York City?', correct_answer: 'Friends', incorrect_answers: ['Seinfeld', 'How I Met Your Mother', 'The Big Bang Theory'] },
    { question: 'Who sang the hit song "Shape of You"?', correct_answer: 'Ed Sheeran', incorrect_answers: ['Justin Bieber', 'Shawn Mendes', 'Harry Styles'] },
    { question: 'Which film is set on the Titanic?', correct_answer: 'Titanic', incorrect_answers: ['The Poseidon Adventure', 'A Night to Remember', 'Ghost Ship'] },
    { question: 'Which actor played Iron Man in the Marvel Cinematic Universe?', correct_answer: 'Robert Downey Jr.', incorrect_answers: ['Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'] },
    { question: 'Which TV series is about a chemistry teacher who starts cooking meth?', correct_answer: 'Breaking Bad', incorrect_answers: ['The Wire', 'Narcos', 'Ozark'] },
    { question: 'Who is the lead singer of the band Coldplay?', correct_answer: 'Chris Martin', incorrect_answers: ['Bono', 'Thom Yorke', 'Dave Grohl'] },
    { question: 'Which film features a talking bear named Paddington?', correct_answer: 'Paddington', incorrect_answers: ['Winnie the Pooh', 'Yogi Bear', 'Baloo'] },
    { question: 'Which British actress played Queen Elizabeth II in "The Crown"?', correct_answer: 'Olivia Colman', incorrect_answers: ['Claire Foy', 'Imelda Staunton', 'Helen Mirren'] },
    { question: 'Which TV show is set in a galaxy far, far away?', correct_answer: 'The Mandalorian', incorrect_answers: ['Star Trek', 'Doctor Who', 'Battlestar Galactica'] },
    { question: 'Who sang the hit song "Uptown Funk"?', correct_answer: 'Mark Ronson ft. Bruno Mars', incorrect_answers: ['Pharrell Williams', 'Justin Timberlake', 'The Weeknd'] },
    { question: 'Which film is a prequel to "The Lord of the Rings" trilogy?', correct_answer: 'The Hobbit', incorrect_answers: ['The Chronicles of Narnia', 'Eragon', 'Willow'] },
    { question: 'Which actor is known for his roles in "The Dark Knight" trilogy and "Inception"?', correct_answer: 'Christian Bale', incorrect_answers: ['Tom Hardy', 'Joseph Gordon-Levitt', 'Cillian Murphy'] },
    { question: 'Which TV series is about a group of superheroes called "The Boys"?', correct_answer: 'The Boys', incorrect_answers: ['Invincible', 'Jupiter\'s Legacy', 'Doom Patrol'] },
    { question: 'Who is the lead singer of the band U2?', correct_answer: 'Bono', incorrect_answers: ['Chris Martin', 'Thom Yorke', 'Dave Grohl'] },
    { question: 'Which film features a young wizard named Harry Potter?', correct_answer: 'Harry Potter and the Philosopher\'s Stone', incorrect_answers: ['Percy Jackson & the Lightning Thief', 'Fantastic Beasts and Where to Find Them', 'The Sorcerer\'s Apprentice'] },
    { question: 'Which British comedian hosts "The Late Late Show" in the US?', correct_answer: 'James Corden', incorrect_answers: ['Ricky Gervais', 'Russell Brand', 'John Oliver'] },
    { question: 'Which TV show is set in a hospital and follows the lives of doctors?', correct_answer: 'Grey\'s Anatomy', incorrect_answers: ['ER', 'House', 'Scrubs'] },
    { question: 'Who sang the hit song "Blinding Lights"?', correct_answer: 'The Weeknd', incorrect_answers: ['Bruno Mars', 'Justin Timberlake', 'Ed Sheeran'] },
    { question: 'Which film is about a group of dinosaurs brought back to life?', correct_answer: 'Jurassic Park', incorrect_answers: ['Godzilla', 'King Kong', 'The Lost World'] },
    { question: 'Which actor played Captain America in the Marvel Cinematic Universe?', correct_answer: 'Chris Evans', incorrect_answers: ['Robert Downey Jr.', 'Mark Ruffalo', 'Chris Hemsworth'] },
    { question: 'Which TV series is set in a post-apocalyptic world with zombies?', correct_answer: 'The Walking Dead', incorrect_answers: ['Fear the Walking Dead', 'Z Nation', 'Black Summer'] },
    { question: 'Who is the lead singer of the band Queen?', correct_answer: 'Freddie Mercury', incorrect_answers: ['Paul Rodgers', 'Adam Lambert', 'Brian May'] },
    { question: 'Which film features a talking lion named Mufasa?', correct_answer: 'The Lion King', incorrect_answers: ['Madagascar', 'Zootopia', 'The Jungle Book'] },
    { question: 'Which British actress is known for her roles in "Pride & Prejudice" and "Atonement"?', correct_answer: 'Keira Knightley', incorrect_answers: ['Carey Mulligan', 'Rosamund Pike', 'Felicity Jones'] },
    { question: 'Which TV show is about a detective who solves crimes in London?', correct_answer: 'Sherlock', incorrect_answers: ['Luther', 'Broadchurch', 'Line of Duty'] },
    { question: 'Who sang the hit song "Bohemian Rhapsody"?', correct_answer: 'Queen', incorrect_answers: ['Led Zeppelin', 'Pink Floyd', 'The Beatles'] },
    { question: 'Which film is about a secret agent named James Bond?', correct_answer: 'Goldfinger', incorrect_answers: ['Mission: Impossible', 'Kingsman', 'Jason Bourne'] },
    { question: 'Which actor played the role of Gandalf in "The Lord of the Rings" films?', correct_answer: 'Ian McKellen', incorrect_answers: ['Patrick Stewart', 'Michael Gambon', 'Christopher Lee'] },
    { question: 'Which TV series is set in a high school and features a glee club?', correct_answer: 'Glee', incorrect_answers: ['High School Musical', 'Fame', 'Smash'] },
    { question: 'Who sang the hit song "I Will Always Love You"?', correct_answer: 'Whitney Houston', incorrect_answers: ['Mariah Carey', 'Celine Dion', 'Adele'] },
    { question: 'Which film features a young boy who discovers he is a wizard?', correct_answer: 'Harry Potter and the Chamber of Secrets', incorrect_answers: ['The Chronicles of Narnia', 'Eragon', 'Percy Jackson & the Sea of Monsters'] },
    { question: 'Which British comedian is known for his stand-up specials and TV shows like "After Life"?', correct_answer: 'Ricky Gervais', incorrect_answers: ['Michael McIntyre', 'Peter Kay', 'Russell Howard'] },
    { question: 'Which TV show is set in a fictional kingdom called Westeros?', correct_answer: 'House of the Dragon', incorrect_answers: ['The Witcher', 'Vikings', 'The Last Kingdom'] },
  ],
  spelling: [
    { question: 'Which spelling is correct?', correct_answer: 'Embarrass', incorrect_answers: ['Embarass', 'Embarras', 'Emberass'] },
    { question: 'Which spelling is correct?', correct_answer: 'Separate', incorrect_answers: ['Seperate', 'Seperete', 'Seporate'] },
    { question: 'Which spelling is correct?', correct_answer: 'Definitely', incorrect_answers: ['Definately', 'Definatly', 'Defanitely'] },
    { question: 'Which spelling is correct?', correct_answer: 'Necessary', incorrect_answers: ['Neccessary', 'Necesary', 'Neccesary'] },
    { question: 'Which spelling is correct?', correct_answer: 'Accommodate', incorrect_answers: ['Acommodate', 'Accomodate', 'Acomodate'] },
    { question: 'Which spelling is correct?', correct_answer: 'Calendar', incorrect_answers: ['Calender', 'Calandar', 'Calander'] },
    { question: 'Which spelling is correct?', correct_answer: 'Cemetery', incorrect_answers: ['Cemetary', 'Cemetrey', 'Cemetry'] },
    { question: 'Which spelling is correct?', correct_answer: 'Conscious', incorrect_answers: ['Concious', 'Conscius', 'Consious'] },
    { question: 'Which spelling is correct?', correct_answer: 'Dilate', incorrect_answers: ['Dielate', 'Delate', 'Dailate'] },
    { question: 'Which spelling is correct?', correct_answer: 'Disappear', incorrect_answers: ['Disapear', 'Dissapear', 'Disappearr'] },
    { question: 'Which spelling is correct?', correct_answer: 'Ecstasy', incorrect_answers: ['Ectasy', 'Ecstacy', 'Exstacy'] },
    { question: 'Which spelling is correct?', correct_answer: 'Fluorescent', incorrect_answers: ['Flourescent', 'Fluoresent', 'Flouresant'] },
    { question: 'Which spelling is correct?', correct_answer: 'Foreign', incorrect_answers: ['Foriegn', 'Forein', 'Forigen'] },
    { question: 'Which spelling is correct?', correct_answer: 'Grateful', incorrect_answers: ['Greatful', 'Gratful', 'Gratefull'] },
    { question: 'Which spelling is correct?', correct_answer: 'Handkerchief', incorrect_answers: ['Hankerchief', 'Handkercheif', 'Handkerchif'] },
    { question: 'Which spelling is correct?', correct_answer: 'Immediately', incorrect_answers: ['Imediately', 'Immediatly', 'Imediatly'] },
    { question: 'Which spelling is correct?', correct_answer: 'Independent', incorrect_answers: ['Independant', 'Indepandent', 'Independint'] },
    { question: 'Which spelling is correct?', correct_answer: 'Jewellery', incorrect_answers: ['Jewelery', 'Jewlery', 'Jewerly'] },
    { question: 'Which spelling is correct?', correct_answer: 'Knowledge', incorrect_answers: ['Knowlege', 'Knowladge', 'Knolledge'] },
    { question: 'Which spelling is correct?', correct_answer: 'Liaison', incorrect_answers: ['Liason', 'Liaision', 'Liaisen'] },
    { question: 'Which spelling is correct?', correct_answer: 'Maintenance', incorrect_answers: ['Maintanence', 'Maintenence', 'Maintinance'] },
    { question: 'Which spelling is correct?', correct_answer: 'Manoeuvre', incorrect_answers: ['Maneuver', 'Manouevre', 'Manoeuver'] },
    { question: 'Which spelling is correct?', correct_answer: 'Minuscule', incorrect_answers: ['Miniscule', 'Miniscule', 'Minisule'] },
    { question: 'Which spelling is correct?', correct_answer: 'Misspell', incorrect_answers: ['Mispell', 'Misspel', 'Misspelll'] },
    { question: 'Which spelling is correct?', correct_answer: 'Occurrence', incorrect_answers: ['Occurence', 'Occurrance', 'Occurance'] },
    { question: 'Which spelling is correct?', correct_answer: 'Parallel', incorrect_answers: ['Paralel', 'Parrallel', 'Paralell'] },
    { question: 'Which spelling is correct?', correct_answer: 'Pharaoh', incorrect_answers: ['Pharoah', 'Pharoh', 'Pharao'] },
    { question: 'Which spelling is correct?', correct_answer: 'Playwright', incorrect_answers: ['Playright', 'Playwrite', 'Playwrigt'] },
    { question: 'Which spelling is correct?', correct_answer: 'Queue', incorrect_answers: ['Que', 'Quew', 'Qeue'] },
    { question: 'Which spelling is correct?', correct_answer: 'Receive', incorrect_answers: ['Recieve', 'Receieve', 'Recive'] },
    { question: 'Which spelling is correct?', correct_answer: 'Recommend', incorrect_answers: ['Reccommend', 'Recomend', 'Reccomend'] },
    { question: 'Which spelling is correct?', correct_answer: 'Restaurant', incorrect_answers: ['Restaurante', 'Restaraunt', 'Resturant'] },
    { question: 'Which spelling is correct?', correct_answer: 'Rhythm', incorrect_answers: ['Rythm', 'Rithm', 'Rhythym'] },
    { question: 'Which spelling is correct?', correct_answer: 'Schedule', incorrect_answers: ['Shedule', 'Scedule', 'Skedule'] },
    { question: 'Which spelling is correct?', correct_answer: 'Scissors', incorrect_answers: ['Scisors', 'Sissors', 'Scissers'] },
    { question: 'Which spelling is correct?', correct_answer: 'Sergeant', incorrect_answers: ['Sargent', 'Sergent', 'Sargeant'] },
    { question: 'Which spelling is correct?', correct_answer: 'Supersede', incorrect_answers: ['Supercede', 'Superseed', 'Supersed'] },
    { question: 'Which spelling is correct?', correct_answer: 'Surprise', incorrect_answers: ['Surprize', 'Surpise', 'Surprisee'] },
    { question: 'Which spelling is correct?', correct_answer: 'Tomorrow', incorrect_answers: ['Tommorow', 'Tommorrow', 'Toomorrow'] },
    { question: 'Which spelling is correct?', correct_answer: 'Truly', incorrect_answers: ['Truely', 'Trully', 'Truley'] },
    { question: 'Which spelling is correct?', correct_answer: 'Unforeseen', incorrect_answers: ['Unforseen', 'Unforessen', 'Unforesene'] },
    { question: 'Which spelling is correct?', correct_answer: 'Vacuum', incorrect_answers: ['Vaccum', 'Vacume', 'Vacum'] },
    { question: 'Which spelling is correct?', correct_answer: 'Wednesday', incorrect_answers: ['Wensday', 'Wednsday', 'Wendsday'] },
    { question: 'Which spelling is correct?', correct_answer: 'Weird', incorrect_answers: ['Wierd', 'Weard', 'Wired'] },
    { question: 'Which spelling is correct?', correct_answer: 'Acquire', incorrect_answers: ['Aquire', 'Acquier', 'Acquiree'] },
    { question: 'Which spelling is correct?', correct_answer: 'Argument', incorrect_answers: ['Arguement', 'Argumant', 'Argueament'] },
    { question: 'Which spelling is correct?', correct_answer: 'Bureaucracy', incorrect_answers: ['Bureacracy', 'Bureaucrazy', 'Bureucracy'] },
    { question: 'Which spelling is correct?', correct_answer: 'Connoisseur', incorrect_answers: ['Conoisseur', 'Connoisseurr', 'Connoiseur'] },
    { question: 'Which spelling is correct?', correct_answer: 'Entrepreneur', incorrect_answers: ['Entreprenuer', 'Enterpreneur', 'Entrepeneur'] },
    { question: 'Which spelling is correct?', correct_answer: 'Fahrenheit', incorrect_answers: ['Farenheit', 'Fahreinheit', 'Fahrenhiet'] },
  ],
  science: [
    { question: 'What gas do plants absorb from the atmosphere?', correct_answer: 'Carbon dioxide', incorrect_answers: ['Oxygen', 'Nitrogen', 'Helium'] },
    { question: 'What is H2O commonly known as?', correct_answer: 'Water', incorrect_answers: ['Salt', 'Hydrogen', 'Vinegar'] },
    { question: 'What force keeps us on the ground?', correct_answer: 'Gravity', incorrect_answers: ['Magnetism', 'Friction', 'Electricity'] },
    { question: 'Which planet is closest to the Sun?', correct_answer: 'Mercury', incorrect_answers: ['Venus', 'Mars', 'Earth'] },
    { question: 'What is the chemical symbol for gold?', correct_answer: 'Au', incorrect_answers: ['Ag', 'Fe', 'Pb'] },
    { question: 'What is the hardest natural substance on Earth?', correct_answer: 'Diamond', incorrect_answers: ['Graphite', 'Quartz', 'Tungsten'] },
    { question: 'Which gas makes up the majority of Earth\'s atmosphere?', correct_answer: 'Nitrogen', incorrect_answers: ['Oxygen', 'Carbon dioxide', 'Argon'] },
    { question: 'What is the process by which plants make their own food?', correct_answer: 'Photosynthesis', incorrect_answers: ['Respiration', 'Transpiration', 'Germination'] },
    { question: 'What is the smallest unit of matter?', correct_answer: 'Atom', incorrect_answers: ['Molecule', 'Cell', 'Proton'] },
    { question: 'Which organ pumps blood throughout the human body?', correct_answer: 'Heart', incorrect_answers: ['Lungs', 'Brain', 'Liver'] },
    { question: 'What is the speed of light in a vacuum?', correct_answer: '299,792,458 meters per second', incorrect_answers: ['300,000 km/s', '186,000 miles per second', '1,080 million km/h'] },
    { question: 'Which scientist developed the theory of relativity?', correct_answer: 'Albert Einstein', incorrect_answers: ['Isaac Newton', 'Stephen Hawking', 'Galileo Galilei'] },
    { question: 'What is the chemical symbol for oxygen?', correct_answer: 'O', incorrect_answers: ['Ox', 'O2', 'Oz'] },
    { question: 'Which planet is known as the "Red Planet"?', correct_answer: 'Mars', incorrect_answers: ['Jupiter', 'Saturn', 'Venus'] },
    { question: 'What is the process of a liquid turning into a gas?', correct_answer: 'Evaporation', incorrect_answers: ['Condensation', 'Sublimation', 'Melting'] },
    { question: 'Which gas do humans breathe out?', correct_answer: 'Carbon dioxide', incorrect_answers: ['Oxygen', 'Nitrogen', 'Hydrogen'] },
    { question: 'What is the study of living organisms called?', correct_answer: 'Biology', incorrect_answers: ['Physics', 'Chemistry', 'Geology'] },
    { question: 'What is the chemical symbol for iron?', correct_answer: 'Fe', incorrect_answers: ['Ir', 'In', 'Io'] },
    { question: 'Which part of the plant absorbs water and nutrients from the soil?', correct_answer: 'Roots', incorrect_answers: ['Leaves', 'Stem', 'Flowers'] },
    { question: 'What is the unit of electric current?', correct_answer: 'Ampere', incorrect_answers: ['Volt', 'Ohm', 'Watt'] },
    { question: 'Which planet has a prominent ring system?', correct_answer: 'Saturn', incorrect_answers: ['Jupiter', 'Uranus', 'Neptune'] },
    { question: 'What is the process of a gas turning into a liquid?', correct_answer: 'Condensation', incorrect_answers: ['Evaporation', 'Sublimation', 'Freezing'] },
    { question: 'Which element is essential for all known life and forms the basis of organic chemistry?', correct_answer: 'Carbon', incorrect_answers: ['Oxygen', 'Hydrogen', 'Nitrogen'] },
    { question: 'What is the largest organ in the human body?', correct_answer: 'Skin', incorrect_answers: ['Liver', 'Brain', 'Heart'] },
    { question: 'What is the chemical symbol for silver?', correct_answer: 'Ag', incorrect_answers: ['Au', 'Si', 'Sr'] },
    { question: 'Which type of energy is stored in a stretched spring?', correct_answer: 'Potential energy', incorrect_answers: ['Kinetic energy', 'Thermal energy', 'Chemical energy'] },
    { question: 'What is the name of the galaxy our solar system is in?', correct_answer: 'Milky Way', incorrect_answers: ['Andromeda', 'Triangulum', 'Whirlpool'] },
    { question: 'What is the process by which rocks are broken down into smaller pieces?', correct_answer: 'Weathering', incorrect_answers: ['Erosion', 'Deposition', 'Sedimentation'] },
    { question: 'Which gas is commonly used in balloons to make them float?', correct_answer: 'Helium', incorrect_answers: ['Hydrogen', 'Oxygen', 'Nitrogen'] },
    { question: 'What is the main function of red blood cells?', correct_answer: 'Transport oxygen', incorrect_answers: ['Fight infection', 'Clot blood', 'Produce antibodies'] },
    { question: 'What is the chemical symbol for sodium?', correct_answer: 'Na', incorrect_answers: ['So', 'Nd', 'Nm'] },
    { question: 'Which type of lens is used to correct short-sightedness (myopia)?', correct_answer: 'Concave lens', incorrect_answers: ['Convex lens', 'Cylindrical lens', 'Prism lens'] },
    { question: 'What is the name of the force that opposes motion?', correct_answer: 'Friction', incorrect_answers: ['Gravity', 'Tension', 'Normal force'] },
    { question: 'Which planet is known as the "Morning Star" or "Evening Star"?', correct_answer: 'Venus', incorrect_answers: ['Mercury', 'Mars', 'Jupiter'] },
    { question: 'What is the process of a solid turning directly into a gas?', correct_answer: 'Sublimation', incorrect_answers: ['Evaporation', 'Condensation', 'Melting'] },
    { question: 'Which acid is found in lemons?', correct_answer: 'Citric acid', incorrect_answers: ['Ascorbic acid', 'Lactic acid', 'Acetic acid'] },
    { question: 'What is the study of the Earth\'s physical structure and substance called?', correct_answer: 'Geology', incorrect_answers: ['Biology', 'Physics', 'Chemistry'] },
    { question: 'What is the chemical symbol for potassium?', correct_answer: 'K', incorrect_answers: ['P', 'Po', 'Pt'] },
    { question: 'Which part of the human eye is responsible for colour vision?', correct_answer: 'Cones', incorrect_answers: ['Rods', 'Pupil', 'Iris'] },
    { question: 'What is the unit of force?', correct_answer: 'Newton', incorrect_answers: ['Joule', 'Watt', 'Pascal'] },
    { question: 'Which planet is the largest in our solar system?', correct_answer: 'Jupiter', incorrect_answers: ['Saturn', 'Uranus', 'Neptune'] },
    { question: 'What is the process of breaking down food into simpler substances?', correct_answer: 'Digestion', incorrect_answers: ['Absorption', 'Metabolism', 'Excretion'] },
    { question: 'What is the chemical symbol for calcium?', correct_answer: 'Ca', incorrect_answers: ['C', 'Cl', 'Co'] },
    { question: 'Which type of rock is formed from the cooling and solidification of molten magma or lava?', correct_answer: 'Igneous rock', incorrect_answers: ['Sedimentary rock', 'Metamorphic rock', 'Volcanic rock'] },
    { question: 'What is the name of the instrument used to measure atmospheric pressure?', correct_answer: 'Barometer', incorrect_answers: ['Thermometer', 'Anemometer', 'Hygrometer'] },
    { question: 'Which gas is produced during photosynthesis?', correct_answer: 'Oxygen', incorrect_answers: ['Carbon dioxide', 'Nitrogen', 'Hydrogen'] },
  ],
  history: [
    { question: 'In which year did the Battle of Hastings take place?', correct_answer: '1066', incorrect_answers: ['1215', '1415', '1666'] },
    { question: 'Who was the monarch during the Spanish Armada?', correct_answer: 'Elizabeth I', incorrect_answers: ['Victoria', 'Henry VIII', 'Mary I'] },
    { question: 'Which wall was built by the Romans across northern England?', correct_answer: "Hadrian's Wall", incorrect_answers: ['Berlin Wall', 'Great Wall', "Offa's Dyke"] },
    { question: 'Who was Prime Minister of Britain during most of World War II?', correct_answer: 'Winston Churchill', incorrect_answers: ['Neville Chamberlain', 'Clement Attlee', 'Harold Wilson'] },
    { question: 'In which year did the First World War begin?', correct_answer: '1914', incorrect_answers: ['1918', '1939', '1900'] },
    { question: 'Who was the first Roman Emperor?', correct_answer: 'Augustus', incorrect_answers: ['Julius Caesar', 'Nero', 'Caligula'] },
    { question: 'Which famous queen of Egypt had a relationship with Mark Antony?', correct_answer: 'Cleopatra', incorrect_answers: ['Nefertiti', 'Hatshepsut', 'Boudica'] },
    { question: 'In which year did the Titanic sink?', correct_answer: '1912', incorrect_answers: ['1905', '1918', '1923'] },
    { question: 'Who was the leader of the Soviet Union during the Cuban Missile Crisis?', correct_answer: 'Nikita Khrushchev', incorrect_answers: ['Joseph Stalin', 'Leon Trotsky', 'Mikhail Gorbachev'] },
    { question: 'Which English king was forced to sign the Magna Carta?', correct_answer: 'King John', incorrect_answers: ['Henry VIII', 'Richard I', 'Edward III'] },
    { question: 'The French Revolution began in which year?', correct_answer: '1789', incorrect_answers: ['1776', '1815', '1848'] },
    { question: 'Who was the first President of the United States?', correct_answer: 'George Washington', incorrect_answers: ['Thomas Jefferson', 'Abraham Lincoln', 'John Adams'] },
    { question: 'Which ancient civilization built the pyramids of Giza?', correct_answer: 'Egyptians', incorrect_answers: ['Romans', 'Greeks', 'Mayans'] },
    { question: 'In which year did the Second World War end?', correct_answer: '1945', incorrect_answers: ['1939', '1941', '1950'] },
    { question: 'Who was the famous nurse known as "The Lady with the Lamp"?', correct_answer: 'Florence Nightingale', incorrect_answers: ['Mary Seacole', 'Edith Cavell', 'Clara Barton'] },
    { question: 'Which Roman general conquered Gaul?', correct_answer: 'Julius Caesar', incorrect_answers: ['Pompey', 'Crassus', 'Augustus'] },
    { question: 'Which British monarch had six wives?', correct_answer: 'Henry VIII', incorrect_answers: ['Edward VI', 'James I', 'Charles II'] },
    { question: 'The Battle of Waterloo took place in which year?', correct_answer: '1815', incorrect_answers: ['1805', '1820', '1830'] },
    { question: 'Who led the Mongol Empire?', correct_answer: 'Genghis Khan', incorrect_answers: ['Attila the Hun', 'Kublai Khan', 'Tamerlane'] },
    { question: 'Which British Prime Minister was known for his appeasement policy towards Nazi Germany?', correct_answer: 'Neville Chamberlain', incorrect_answers: ['Winston Churchill', 'Clement Attlee', 'Harold Macmillan'] },
    { question: 'In which year did the Berlin Wall fall?', correct_answer: '1989', incorrect_answers: ['1985', '1991', '1979'] },
    { question: 'Who was the last Tsar of Russia?', correct_answer: 'Nicholas II', incorrect_answers: ['Peter the Great', 'Ivan the Terrible', 'Alexander I'] },
    { question: 'Which ancient Greek philosopher was the teacher of Alexander the Great?', correct_answer: 'Aristotle', incorrect_answers: ['Plato', 'Socrates', 'Pythagoras'] },
    { question: 'Which British queen reigned for over 63 years, from 1837 to 1901?', correct_answer: 'Queen Victoria', incorrect_answers: ['Queen Elizabeth I', 'Queen Anne', 'Queen Elizabeth II'] },
    { question: 'The American Civil War was fought between which years?', correct_answer: '1861-1865', incorrect_answers: ['1775-1783', '1812-1815', '1914-1918'] },
    { question: 'Who discovered America in 1492?', correct_answer: 'Christopher Columbus', incorrect_answers: ['Amerigo Vespucci', 'Ferdinand Magellan', 'Vasco da Gama'] },
    { question: 'Which Roman emperor made Christianity the state religion of the Roman Empire?', correct_answer: 'Constantine the Great', incorrect_answers: ['Nero', 'Diocletian', 'Theodosius I'] },
    { question: 'Which British explorer was the first to circumnavigate the globe?', correct_answer: 'Ferdinand Magellan', incorrect_answers: ['James Cook', 'Francis Drake', 'Walter Raleigh'] },
    { question: 'In which year did the Battle of Trafalgar take place?', correct_answer: '1805', incorrect_answers: ['1798', '1812', '1815'] },
    { question: 'Who was the leader of Nazi Germany?', correct_answer: 'Adolf Hitler', incorrect_answers: ['Benito Mussolini', 'Joseph Stalin', 'Hideki Tojo'] },
    { question: 'Which ancient city was the capital of the Byzantine Empire?', correct_answer: 'Constantinople', incorrect_answers: ['Rome', 'Athens', 'Alexandria'] },
    { question: 'Which British Prime Minister served during the Falklands War?', correct_answer: 'Margaret Thatcher', incorrect_answers: ['John Major', 'Tony Blair', 'Harold Wilson'] },
    { question: 'The Industrial Revolution began in which country?', correct_answer: 'Great Britain', incorrect_answers: ['United States', 'Germany', 'France'] },
    { question: 'Who wrote the Declaration of Independence?', correct_answer: 'Thomas Jefferson', incorrect_answers: ['George Washington', 'Benjamin Franklin', 'John Adams'] },
    { question: 'Which ancient wonder of the world was a massive lighthouse?', correct_answer: 'Lighthouse of Alexandria', incorrect_answers: ['Colossus of Rhodes', 'Statue of Zeus at Olympia', 'Hanging Gardens of Babylon'] },
    { question: 'Which British monarch was known as the "Virgin Queen"?', correct_answer: 'Elizabeth I', incorrect_answers: ['Mary I', 'Victoria', 'Anne'] },
    { question: 'In which year did the Battle of Britain take place?', correct_answer: '1940', incorrect_answers: ['1939', '1941', '1942'] },
    { question: 'Who was the last Anglo-Saxon king of England?', correct_answer: 'Harold Godwinson', incorrect_answers: ['Edward the Confessor', 'Alfred the Great', 'William the Conqueror'] },
    { question: 'Which famous Roman general was assassinated on the Ides of March?', correct_answer: 'Julius Caesar', incorrect_answers: ['Augustus', 'Pompey', 'Mark Antony'] },
    { question: 'Which British Prime Minister was known for his "New Labour" policies?', correct_answer: 'Tony Blair', incorrect_answers: ['John Major', 'Gordon Brown', 'Harold Wilson'] },
    { question: 'The Cold War was primarily a geopolitical rivalry between which two superpowers?', correct_answer: 'United States and Soviet Union', incorrect_answers: ['United States and China', 'Soviet Union and China', 'United States and Germany'] },
    { question: 'Who was the first female Prime Minister of India?', correct_answer: 'Indira Gandhi', incorrect_answers: ['Benazir Bhutto', 'Golda Meir', 'Margaret Thatcher'] },
    { question: 'Which ancient civilization developed hieroglyphic writing?', correct_answer: 'Egyptians', incorrect_answers: ['Mesopotamians', 'Greeks', 'Romans'] },
    { question: 'Which British monarch was restored to the throne in 1660?', correct_answer: 'Charles II', incorrect_answers: ['James II', 'William III', 'George I'] },
    { question: 'In which year did the Great Fire of London occur?', correct_answer: '1666', incorrect_answers: ['1600', '1642', '1688'] },
    { question: 'Who was the leader of the Soviet Union at the time of its dissolution?', correct_answer: 'Mikhail Gorbachev', incorrect_answers: ['Leonid Brezhnev', 'Yuri Andropov', 'Konstantin Chernenko'] },
  ],
  books: [
    { question: 'Who wrote The Hobbit?', correct_answer: 'J. R. R. Tolkien', incorrect_answers: ['C. S. Lewis', 'Roald Dahl', 'George Orwell'] },
    { question: 'Sherlock Holmes lived at which fictional address?', correct_answer: '221B Baker Street', incorrect_answers: ['10 Downing Street', 'Privet Drive', 'Pemberley'] },
    { question: 'Who wrote the Harry Potter books?', correct_answer: 'J. K. Rowling', incorrect_answers: ['Jacqueline Wilson', 'Enid Blyton', 'Julia Donaldson'] },
    { question: 'Which Roald Dahl book features a giant peach?', correct_answer: 'James and the Giant Peach', incorrect_answers: ['Matilda', 'The BFG', 'The Twits'] },
    { question: 'Who wrote the play "Romeo and Juliet"?', correct_answer: 'William Shakespeare', incorrect_answers: ['Christopher Marlowe', 'Ben Jonson', 'John Milton'] },
    { question: 'Which novel features a character named Elizabeth Bennet?', correct_answer: 'Pride and Prejudice', incorrect_answers: ['Sense and Sensibility', 'Emma', 'Wuthering Heights'] },
    { question: 'Who wrote "1984"?', correct_answer: 'George Orwell', incorrect_answers: ['Aldous Huxley', 'Ray Bradbury', 'H. G. Wells'] },
    { question: 'Which children\'s book features a very hungry caterpillar?', correct_answer: 'The Very Hungry Caterpillar', incorrect_answers: ['Brown Bear, Brown Bear, What Do You See?', 'From Head to Toe', 'The Mixed-Up Chameleon'] },
    { question: 'Who wrote "To Kill a Mockingbird"?', correct_answer: 'Harper Lee', incorrect_answers: ['F. Scott Fitzgerald', 'Ernest Hemingway', 'John Steinbeck'] },
    { question: 'Which fictional detective lives in Baker Street?', correct_answer: 'Sherlock Holmes', incorrect_answers: ['Hercule Poirot', 'Miss Marple', 'Philip Marlowe'] },
    { question: 'Who wrote "Alice\'s Adventures in Wonderland"?', correct_answer: 'Lewis Carroll', incorrect_answers: ['Beatrix Potter', 'A. A. Milne', 'J. M. Barrie'] },
    { question: 'Which novel is set on a desert planet called Arrakis?', correct_answer: 'Dune', incorrect_answers: ['Foundation', 'Neuromancer', 'Ender\'s Game'] },
    { question: 'Who wrote "The Great Gatsby"?', correct_answer: 'F. Scott Fitzgerald', incorrect_answers: ['Ernest Hemingway', 'John Steinbeck', 'William Faulkner'] },
    { question: 'Which classic novel begins with the line "Call me Ishmael"?', correct_answer: 'Moby Dick', incorrect_answers: ['Twenty Thousand Leagues Under the Seas', 'Treasure Island', 'Robinson Crusoe'] },
    { question: 'Who wrote "Frankenstein"?', correct_answer: 'Mary Shelley', incorrect_answers: ['Bram Stoker', 'Edgar Allan Poe', 'H. P. Lovecraft'] },
    { question: 'Which children\'s author created characters like Matilda and Willy Wonka?', correct_answer: 'Roald Dahl', incorrect_answers: ['Enid Blyton', 'C. S. Lewis', 'A. A. Milne'] },
    { question: 'Who wrote "War and Peace"?', correct_answer: 'Leo Tolstoy', incorrect_answers: ['Fyodor Dostoevsky', 'Anton Chekhov', 'Ivan Turgenev'] },
    { question: 'Which novel features a character named Katniss Everdeen?', correct_answer: 'The Hunger Games', incorrect_answers: ['Divergent', 'The Maze Runner', 'Twilight'] },
    { question: 'Who wrote "Jane Eyre"?', correct_answer: 'Charlotte Brontë', incorrect_answers: ['Emily Brontë', 'Jane Austen', 'George Eliot'] },
    { question: 'Which book is about a group of animals who take over a farm?', correct_answer: 'Animal Farm', incorrect_answers: ['Charlotte\'s Web', 'Watership Down', 'The Wind in the Willows'] },
    { question: 'Who wrote "The Lord of the Rings"?', correct_answer: 'J. R. R. Tolkien', incorrect_answers: ['C. S. Lewis', 'George R. R. Martin', 'Terry Pratchett'] },
    { question: 'Which novel features a character named Atticus Finch?', correct_answer: 'To Kill a Mockingbird', incorrect_answers: ['The Catcher in the Rye', 'Of Mice and Men', 'The Grapes of Wrath'] },
    { question: 'Who wrote "Dracula"?', correct_answer: 'Bram Stoker', incorrect_answers: ['Mary Shelley', 'Edgar Allan Poe', 'H. P. Lovecraft'] },
    { question: 'Which children\'s book features a boy who goes on an adventure with a tiger?', correct_answer: 'The Tiger Who Came to Tea', incorrect_answers: ['The Gruffalo', 'We\'re Going on a Bear Hunt', 'Where the Wild Things Are'] },
    { question: 'Who wrote "Les Misérables"?', correct_answer: 'Victor Hugo', incorrect_answers: ['Alexandre Dumas', 'Gustave Flaubert', 'Émile Zola'] },
    { question: 'Which novel is set in a dystopian future where books are burned?', correct_answer: 'Fahrenheit 451', incorrect_answers: ['1984', 'Brave New World', 'The Handmaid\'s Tale'] },
    { question: 'Who wrote "Wuthering Heights"?', correct_answer: 'Emily Brontë', incorrect_answers: ['Charlotte Brontë', 'Jane Austen', 'Mary Shelley'] },
    { question: 'Which book features a character named Winnie-the-Pooh?', correct_answer: 'Winnie-the-Pooh', incorrect_answers: ['Paddington Bear', 'Rupert Bear', 'Yogi Bear'] },
    { question: 'Who wrote "A Christmas Carol"?', correct_answer: 'Charles Dickens', incorrect_answers: ['Jane Austen', 'Charlotte Brontë', 'George Eliot'] },
    { question: 'Which novel features a character named Holden Caulfield?', correct_answer: 'The Catcher in the Rye', incorrect_answers: ['To Kill a Mockingbird', 'Of Mice and Men', 'The Great Gatsby'] },
    { question: 'Who wrote "The Odyssey"?', correct_answer: 'Homer', incorrect_answers: ['Virgil', 'Sophocles', 'Euripides'] },
    { question: 'Which children\'s book features a boy who can talk to animals?', correct_answer: 'Doctor Dolittle', incorrect_answers: ['Peter Rabbit', 'Curious George', 'Babar the Elephant'] },
    { question: 'Who wrote "Crime and Punishment"?', correct_answer: 'Fyodor Dostoevsky', incorrect_answers: ['Leo Tolstoy', 'Anton Chekhov', 'Ivan Turgenev'] },
    { question: 'Which novel is set in a post-apocalyptic world where a father and son journey across America?', correct_answer: 'The Road', incorrect_answers: ['Dune', 'The Stand', 'Station Eleven'] },
    { question: 'Who wrote "The Picture of Dorian Gray"?', correct_answer: 'Oscar Wilde', incorrect_answers: ['Robert Louis Stevenson', 'Bram Stoker', 'Edgar Allan Poe'] },
    { question: 'Which book features a character named Bilbo Baggins?', correct_answer: 'The Hobbit', incorrect_answers: ['The Lord of the Rings', 'The Silmarillion', 'Unfinished Tales'] },
    { question: 'Who wrote "Don Quixote"?', correct_answer: 'Miguel de Cervantes', incorrect_answers: ['Lope de Vega', 'Calderón de la Barca', 'Gabriel García Márquez'] },
    { question: 'Which children\'s book features a girl who finds a golden ticket?', correct_answer: 'Charlie and the Chocolate Factory', incorrect_answers: ['Matilda', 'The BFG', 'The Witches'] },
    { question: 'Who wrote "Moby Dick"?', correct_answer: 'Herman Melville', incorrect_answers: ['Ernest Hemingway', 'Jack London', 'Joseph Conrad'] },
    { question: 'Which novel is set in a boarding school for young witches and wizards?', correct_answer: 'Harry Potter and the Sorcerer\'s Stone', incorrect_answers: ['The Worst Witch', 'A Wizard of Earthsea', 'Nevermoor'] },
    { question: 'Who wrote "The Old Man and the Sea"?', correct_answer: 'Ernest Hemingway', incorrect_answers: ['F. Scott Fitzgerald', 'John Steinbeck', 'William Faulkner'] },
    { question: 'Which book features a character named Gandalf?', correct_answer: 'The Lord of the Rings', incorrect_answers: ['The Hobbit', 'The Silmarillion', 'Unfinished Tales'] },
    { question: 'Who wrote "Great Expectations"?', correct_answer: 'Charles Dickens', incorrect_answers: ['Jane Austen', 'Charlotte Brontë', 'George Eliot'] },
    { question: 'Which children\'s book features a bear who loves marmalade sandwiches?', correct_answer: 'Paddington Bear', incorrect_answers: ['Winnie-the-Pooh', 'Rupert Bear', 'Yogi Bear'] },
    { question: 'Who wrote "The Handmaid\'s Tale"?', correct_answer: 'Margaret Atwood', incorrect_answers: ['Ursula K. Le Guin', 'Octavia E. Butler', 'Shirley Jackson'] },
    { question: 'Which novel features a character named Elizabeth Lavenza?', correct_answer: 'Frankenstein', incorrect_answers: ['Dracula', 'The Strange Case of Dr. Jekyll and Mr. Hyde', 'The Picture of Dorian Gray'] },
  ],
  words: [
    { question: 'What does "benevolent" mean?', correct_answer: 'Kind and well meaning', incorrect_answers: ['Very old', 'Hard to read', 'Likely to break'] },
    { question: 'Which word means a word that sounds like another but has a different meaning?', correct_answer: 'Homophone', incorrect_answers: ['Synonym', 'Antonym', 'Acronym'] },
    { question: 'Which word means the opposite of "ancient"?', correct_answer: 'Modern', incorrect_answers: ['Old', 'Historic', 'Broken'] },
    { question: 'What is a baby cat called?', correct_answer: 'Kitten', incorrect_answers: ['Puppy', 'Calf', 'Foal'] },
    { question: 'What does "ubiquitous" mean?', correct_answer: 'Present, appearing, or found everywhere', incorrect_answers: ['Rare', 'Unique', 'Hidden'] },
    { question: 'Which word means a word with the same meaning as another?', correct_answer: 'Synonym', incorrect_answers: ['Antonym', 'Homonym', 'Acronym'] },
    { question: 'What does "ephemeral" mean?', correct_answer: 'Lasting for a very short time', incorrect_answers: ['Long-lasting', 'Permanent', 'Eternal'] },
    { question: 'What is a baby dog called?', correct_answer: 'Puppy', incorrect_answers: ['Kitten', 'Calf', 'Foal'] },
    { question: 'What does "gregarious" mean?', correct_answer: 'Fond of company; sociable', incorrect_answers: ['Shy', 'Solitary', 'Quiet'] },
    { question: 'Which word means a word with the opposite meaning of another?', correct_answer: 'Antonym', incorrect_answers: ['Synonym', 'Homonym', 'Acronym'] },
    { question: 'What does "cacophony" mean?', correct_answer: 'A harsh, discordant mixture of sounds', incorrect_answers: ['Harmony', 'Melody', 'Silence'] },
    { question: 'What is a baby cow called?', correct_answer: 'Calf', incorrect_answers: ['Kitten', 'Puppy', 'Foal'] },
    { question: 'What does "mellifluous" mean?', correct_answer: 'Sweet or musical; pleasant to hear', incorrect_answers: ['Harsh', 'Discordant', 'Loud'] },
    { question: 'Which word refers to a figure of speech involving the comparison of one thing with another thing of a different kind, used to make a description more emphatic or vivid?', correct_answer: 'Simile', incorrect_answers: ['Metaphor', 'Hyperbole', 'Personification'] },
    { question: 'What does "plethora" mean?', correct_answer: 'An excess of something', incorrect_answers: ['Scarcity', 'Lack', 'Shortage'] },
    { question: 'What is a baby horse called?', correct_answer: 'Foal', incorrect_answers: ['Kitten', 'Puppy', 'Calf'] },
    { question: 'What does "quixotic" mean?', correct_answer: 'Extremely idealistic; unrealistic and impractical', incorrect_answers: ['Realistic', 'Practical', 'Pragmatic'] },
    { question: 'Which word means the use of words that sound like what they mean?', correct_answer: 'Onomatopoeia', incorrect_answers: ['Alliteration', 'Assonance', 'Consonance'] },
    { question: 'What does "serendipity" mean?', correct_answer: 'The occurrence and development of events by chance in a happy or beneficial way', incorrect_answers: ['Misfortune', 'Bad luck', 'Tragedy'] },
    { question: 'What is a baby sheep called?', correct_answer: 'Lamb', incorrect_answers: ['Kid', 'Calf', 'Fawn'] },
    { question: 'What does "parsimonious" mean?', correct_answer: 'Extremely unwilling to spend money or use resources', incorrect_answers: ['Generous', 'Extravagant', 'Wasteful'] },
    { question: 'Which word means an exaggerated statement or claim not meant to be taken literally?', correct_answer: 'Hyperbole', incorrect_answers: ['Metaphor', 'Simile', 'Understatement'] },
    { question: 'What does "perfunctory" mean?', correct_answer: 'Carried out with a minimum of effort or reflection', incorrect_answers: ['Thorough', 'Careful', 'Diligent'] },
    { question: 'What is a baby goat called?', correct_answer: 'Kid', incorrect_answers: ['Lamb', 'Calf', 'Fawn'] },
    { question: 'What does "sycophant" mean?', correct_answer: 'A person who acts obsequiously towards someone important in order to gain advantage', incorrect_answers: ['Leader', 'Rebel', 'Critic'] },
    { question: 'Which word means a word formed from the initial letters of other words and pronounced as a word?', correct_answer: 'Acronym', incorrect_answers: ['Abbreviation', 'Initialism', 'Contraction'] },
    { question: 'What does "turgid" mean?', correct_answer: 'Swollen and distended or congested', incorrect_answers: ['Shrunken', 'Deflated', 'Flat'] },
    { question: 'What is a baby deer called?', correct_answer: 'Fawn', incorrect_answers: ['Kid', 'Lamb', 'Calf'] },
    { question: 'What does "vacillate" mean?', correct_answer: 'Alternate or waver between different opinions or actions', incorrect_answers: ['Decide', 'Commit', 'Resolve'] },
    { question: 'Which word means a figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable?', correct_answer: 'Metaphor', incorrect_answers: ['Simile', 'Hyperbole', 'Personification'] },
    { question: 'What does "zephyr" mean?', correct_answer: 'A soft, gentle breeze', incorrect_answers: ['Gale', 'Storm', 'Hurricane'] },
    { question: 'What is a baby bear called?', correct_answer: 'Cub', incorrect_answers: ['Kit', 'Pup', 'Joey'] },
    { question: 'What does "alacrity" mean?', correct_answer: 'Brisk and cheerful readiness', incorrect_answers: ['Reluctance', 'Hesitation', 'Slowness'] },
    { question: 'Which word means a mild or indirect word or expression substituted for one considered to be too harsh or blunt when referring to something unpleasant or embarrassing?', correct_answer: 'Euphemism', incorrect_answers: ['Dysphemism', 'Hyperbole', 'Understatement'] },
    { question: 'What does "capricious" mean?', correct_answer: 'Given to sudden and unaccountable changes of mood or behaviour', incorrect_answers: ['Consistent', 'Stable', 'Predictable'] },
    { question: 'What is a baby kangaroo called?', correct_answer: 'Joey', incorrect_answers: ['Cub', 'Kit', 'Pup'] },
    { question: 'What does "deleterious" mean?', correct_answer: 'Causing harm or damage', incorrect_answers: ['Beneficial', 'Harmless', 'Helpful'] },
    { question: 'Which word means the repetition of an initial consonant sound in multiple words?', correct_answer: 'Alliteration', incorrect_answers: ['Assonance', 'Consonance', 'Onomatopoeia'] },
    { question: 'What does "equivocate" mean?', correct_answer: 'Use ambiguous language so as to conceal the truth or avoid committing oneself', incorrect_answers: ['Speak clearly', 'Be honest', 'State directly'] },
    { question: 'What is a baby owl called?', correct_answer: 'Owlet', incorrect_answers: ['Chick', 'Fledgling', 'Nestling'] },
    { question: 'What does "fastidious" mean?', correct_answer: 'Very attentive to and concerned about accuracy and detail', incorrect_answers: ['Careless', 'Sloppy', 'Negligent'] },
    { question: 'Which word means a play on words?', correct_answer: 'Pun', incorrect_answers: ['Joke', 'Riddle', 'Proverb'] },
    { question: 'What does "ignominious" mean?', correct_answer: 'Deserving or causing public disgrace or shame', incorrect_answers: ['Honourable', 'Respectable', 'Dignified'] },
    { question: 'What is a baby frog called?', correct_answer: 'Tadpole', incorrect_answers: ['Froglet', 'Polliwog', 'Spawn'] },
    { question: 'What does "juxtapose" mean?', correct_answer: 'Place or deal with close together for contrasting effect', incorrect_answers: ['Separate', 'Combine', 'Align'] },
    { question: 'Which word means a long, angry speech of criticism or accusation?', correct_answer: 'Harangue', incorrect_answers: ['Praise', 'Compliment', 'Eulogy'] },
  ],
  britain: [
    { question: 'What is the national flower of England?', correct_answer: 'Rose', incorrect_answers: ['Thistle', 'Daffodil', 'Shamrock'] },
    { question: 'Which sea lies east of Great Britain?', correct_answer: 'North Sea', incorrect_answers: ['Irish Sea', 'Celtic Sea', 'Atlantic Ocean'] },
    { question: 'What is the capital city of Wales?', correct_answer: 'Cardiff', incorrect_answers: ['Swansea', 'Newport', 'Wrexham'] },
    { question: 'What is the currency of the United Kingdom?', correct_answer: 'Pound sterling', incorrect_answers: ['Euro', 'Dollar', 'Franc'] },
    { question: 'What is the national animal of Scotland?', correct_answer: 'Unicorn', incorrect_answers: ['Lion', 'Dragon', 'Stag'] },
    { question: 'Which famous clock tower is located at the Palace of Westminster?', correct_answer: 'Big Ben', incorrect_answers: ['Elizabeth Tower', 'Westminster Chimes', 'Clock of Westminster'] },
    { question: 'What is the traditional dish of Scotland, often served on Burns Night?', correct_answer: 'Haggis', incorrect_answers: ['Neeps and Tatties', 'Cullen Skink', 'Scotch Broth'] },
    { question: 'Which British monarch is the longest-reigning in UK history?', correct_answer: 'Queen Elizabeth II', incorrect_answers: ['Queen Victoria', 'George III', 'Henry VIII'] },
    { question: 'What is the national sport of England?', correct_answer: 'Cricket', incorrect_answers: ['Football', 'Rugby', 'Tennis'] },
    { question: 'Which famous prehistoric monument is located in Wiltshire, England?', correct_answer: 'Stonehenge', incorrect_answers: ['Avebury', 'Silbury Hill', 'Woodhenge'] },
    { question: 'What is the national symbol of Wales?', correct_answer: 'Dragon', incorrect_answers: ['Leek', 'Daffodil', 'Rose'] },
    { question: 'Which British city is famous for its Roman baths?', correct_answer: 'Bath', incorrect_answers: ['Bristol', 'Chester', 'York'] },
    { question: 'What is the traditional breakfast food in the UK, often served with bacon and eggs?', correct_answer: 'Full English breakfast', incorrect_answers: ['Continental breakfast', 'American breakfast', 'French toast'] },
    { question: 'Which famous British secret agent is known by the code 007?', correct_answer: 'James Bond', incorrect_answers: ['Jason Bourne', 'Ethan Hunt', 'Jack Ryan'] },
    { question: 'What is the national drink of Scotland?', correct_answer: 'Whisky', incorrect_answers: ['Irn-Bru', 'Gin', 'Beer'] },
    { question: 'Which British Prime Minister was known as the "Iron Lady"?', correct_answer: 'Margaret Thatcher', incorrect_answers: ['Theresa May', 'Liz Truss', 'Indira Gandhi'] },
    { question: 'What is the highest mountain in Wales?', correct_answer: 'Snowdon', incorrect_answers: ['Cadair Idris', 'Pen y Fan', 'Tryfan'] },
    { question: 'Which famous British playwright wrote "Hamlet" and "Romeo and Juliet"?', correct_answer: 'William Shakespeare', incorrect_answers: ['Christopher Marlowe', 'Ben Jonson', 'George Bernard Shaw'] },
    { question: 'What is the traditional Christmas dessert in the UK?', correct_answer: 'Christmas pudding', incorrect_answers: ['Mince pie', 'Trifle', 'Yule log'] },
    { question: 'Which British pop group was famous for songs like "Bohemian Rhapsody" and "We Will Rock You"?', correct_answer: 'Queen', incorrect_answers: ['The Beatles', 'Led Zeppelin', 'Rolling Stones'] },
    { question: 'What is the national tree of England?', correct_answer: 'Oak', incorrect_answers: ['Elm', 'Ash', 'Beech'] },
    { question: 'Which famous British scientist developed the theory of evolution by natural selection?', correct_answer: 'Charles Darwin', incorrect_answers: ['Isaac Newton', 'Stephen Hawking', 'Alan Turing'] },
    { question: 'What is the traditional Scottish garment worn by men?', correct_answer: 'Kilt', incorrect_answers: ['Tartan', 'Sporran', 'Ghille Brogues'] },
    { question: 'Which British city is known for its music scene and is home to the band Oasis?', correct_answer: 'Manchester', incorrect_answers: ['Liverpool', 'London', 'Birmingham'] },
    { question: 'What is the national bird of England?', correct_answer: 'Robin', incorrect_answers: ['Eagle', 'Swan', 'Pigeon'] },
    { question: 'Which famous British author wrote "Alice\'s Adventures in Wonderland"?', correct_answer: 'Lewis Carroll', incorrect_answers: ['Roald Dahl', 'Beatrix Potter', 'A. A. Milne'] },
    { question: 'What is the traditional Welsh folk instrument?', correct_answer: 'Harp', incorrect_answers: ['Bagpipes', 'Fiddle', 'Accordion'] },
    { question: 'Which British Prime Minister was known for his distinctive hairstyle and love of cigars?', correct_answer: 'Winston Churchill', incorrect_answers: ['Clement Attlee', 'Harold Wilson', 'Edward Heath'] },
    { question: 'What is the national dish of England?', correct_answer: 'Fish and Chips', incorrect_answers: ['Roast Beef and Yorkshire Pudding', 'Shepherd\'s Pie', 'Bangers and Mash'] },
    { question: 'Which famous British band released the album "Sgt. Pepper\'s Lonely Hearts Club Band"?', correct_answer: 'The Beatles', incorrect_answers: ['The Rolling Stones', 'The Who', 'Led Zeppelin'] },
    { question: 'What is the national sport of Wales?', correct_answer: 'Rugby Union', incorrect_answers: ['Football', 'Cricket', 'Horse Racing'] },
    { question: 'Which British scientist is famous for his laws of motion and universal gravitation?', correct_answer: 'Isaac Newton', incorrect_answers: ['Charles Darwin', 'Stephen Hawking', 'Alan Turing'] },
    { question: 'What is the traditional Scottish dance?', correct_answer: 'Highland Fling', incorrect_answers: ['Ceilidh', 'Strip the Willow', 'Scottish Country Dance'] },
    { question: 'Which British city is home to the Tower of London?', correct_answer: 'London', incorrect_answers: ['Edinburgh', 'York', 'Canterbury'] },
    { question: 'What is the national flower of Scotland?', correct_answer: 'Thistle', incorrect_answers: ['Rose', 'Daffodil', 'Shamrock'] },
    { question: 'Which British author wrote "Pride and Prejudice"?', correct_answer: 'Jane Austen', incorrect_answers: ['Charlotte Brontë', 'Emily Brontë', 'George Eliot'] },
    { question: 'What is the traditional Welsh cake?', correct_answer: 'Welsh cake', incorrect_answers: ['Scone', 'Crumpet', 'Pancake'] },
    { question: 'Which British Prime Minister was known for his "Iron Curtain" speech?', correct_answer: 'Winston Churchill', incorrect_answers: ['Clement Attlee', 'Harold Wilson', 'Edward Heath'] },
    { question: 'What is the national dish of Scotland?', correct_answer: 'Haggis', incorrect_answers: ['Scotch Broth', 'Cullen Skink', 'Fish and Chips'] },
    { question: 'Which famous British band released the song "Stairway to Heaven"?', correct_answer: 'Led Zeppelin', incorrect_answers: ['Pink Floyd', 'Queen', 'The Rolling Stones'] },
    { question: 'What is the national sport of Northern Ireland?', correct_answer: 'Gaelic Football', incorrect_answers: ['Hurling', 'Rugby Union', 'Association Football'] },
    { question: 'Which British scientist is known for his work on black holes and cosmology?', correct_answer: 'Stephen Hawking', incorrect_answers: ['Isaac Newton', 'Charles Darwin', 'Alan Turing'] },
    { question: 'What is the traditional Scottish New Year\'s Eve celebration called?', correct_answer: 'Hogmanay', incorrect_answers: ['Burns Night', 'St Andrew\'s Day', 'Beltane'] },
    { question: 'Which British city is famous for its university and punting on the River Cam?', correct_answer: 'Cambridge', incorrect_answers: ['Oxford', 'Durham', 'St Andrews'] },
    { question: 'What is the national flower of Northern Ireland?', correct_answer: 'Shamrock', incorrect_answers: ['Rose', 'Thistle', 'Daffodil'] },
    { question: 'Which British author wrote "Harry Potter"?', correct_answer: 'J. K. Rowling', incorrect_answers: ['Enid Blyton', 'Roald Dahl', 'Jacqueline Wilson'] },
  ],
  general: [
    { question: 'Which planet is known as the Red Planet?', correct_answer: 'Mars', incorrect_answers: ['Venus', 'Jupiter', 'Saturn'] },
    { question: 'How many sides does a hexagon have?', correct_answer: '6', incorrect_answers: ['5', '7', '8'] },
    { question: 'What is the capital city of France?', correct_answer: 'Paris', incorrect_answers: ['Lyon', 'Marseille', 'Nice'] },
    { question: 'How many days are there in a leap year?', correct_answer: '366', incorrect_answers: ['365', '364', '367'] },
    { question: 'What colour do you get by mixing red and white?', correct_answer: 'Pink', incorrect_answers: ['Purple', 'Orange', 'Brown'] },
    { question: 'How many minutes are there in one hour?', correct_answer: '60', incorrect_answers: ['30', '90', '100'] },
    { question: 'What is the largest ocean on Earth?', correct_answer: 'Pacific Ocean', incorrect_answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'] },
    { question: 'What is the chemical symbol for water?', correct_answer: 'H2O', incorrect_answers: ['CO2', 'O2', 'NaCl'] },
    { question: 'Which animal is known as the "King of the Jungle"?', correct_answer: 'Lion', incorrect_answers: ['Tiger', 'Elephant', 'Bear'] },
    { question: 'What is the capital city of Australia?', correct_answer: 'Canberra', incorrect_answers: ['Sydney', 'Melbourne', 'Brisbane'] },
    { question: 'How many continents are there in the world?', correct_answer: '7', incorrect_answers: ['5', '6', '8'] },
    { question: 'What is the main ingredient in guacamole?', correct_answer: 'Avocado', incorrect_answers: ['Tomato', 'Onion', 'Chilli'] },
    { question: 'Which famous painting was created by Leonardo da Vinci?', correct_answer: 'Mona Lisa', incorrect_answers: ['The Last Supper', 'Starry Night', 'The Scream'] },
    { question: 'What is the highest mountain in the world?', correct_answer: 'Mount Everest', incorrect_answers: ['K2', 'Mount Kilimanjaro', 'Mount Fuji'] },
    { question: 'What is the currency of Japan?', correct_answer: 'Yen', incorrect_answers: ['Won', 'Yuan', 'Dollar'] },
    { question: 'Which planet is known as the "Gas Giant"?', correct_answer: 'Jupiter', incorrect_answers: ['Mars', 'Earth', 'Venus'] },
    { question: 'What is the largest desert in the world?', correct_answer: 'Antarctic Polar Desert', incorrect_answers: ['Sahara Desert', 'Arctic Polar Desert', 'Gobi Desert'] },
    { question: 'What is the capital city of Canada?', correct_answer: 'Ottawa', incorrect_answers: ['Toronto', 'Vancouver', 'Montreal'] },
    { question: 'How many colours are in a rainbow?', correct_answer: '7', incorrect_answers: ['6', '8', '5'] },
    { question: 'What is the hardest substance in the human body?', correct_answer: 'Tooth enamel', incorrect_answers: ['Bone', 'Diamond', 'Nail'] },
    { question: 'Which country is famous for the Great Wall?', correct_answer: 'China', incorrect_answers: ['India', 'Japan', 'Korea'] },
    { question: 'What is the capital city of Germany?', correct_answer: 'Berlin', incorrect_answers: ['Munich', 'Hamburg', 'Frankfurt'] },
    { question: 'What is the chemical symbol for gold?', correct_answer: 'Au', incorrect_answers: ['Ag', 'Fe', 'Pb'] },
    { question: 'Which animal lays the largest eggs?', correct_answer: 'Ostrich', incorrect_answers: ['Chicken', 'Eagle', 'Crocodile'] },
    { question: 'What is the capital city of Italy?', correct_answer: 'Rome', incorrect_answers: ['Milan', 'Venice', 'Florence'] },
    { question: 'How many legs does a spider have?', correct_answer: '8', incorrect_answers: ['6', '10', '4'] },
    { question: 'What is the longest river in the UK?', correct_answer: 'River Severn', incorrect_answers: ['River Thames', 'River Trent', 'River Wye'] },
    { question: 'What is the capital city of Spain?', correct_answer: 'Madrid', incorrect_answers: ['Barcelona', 'Seville', 'Valencia'] },
    { question: 'Which gas do plants need to grow?', correct_answer: 'Carbon dioxide', incorrect_answers: ['Oxygen', 'Nitrogen', 'Hydrogen'] },
    { question: 'What is the largest land animal?', correct_answer: 'African elephant', incorrect_answers: ['Asian elephant', 'Rhinoceros', 'Hippopotamus'] },
    { question: 'What is the capital city of Russia?', correct_answer: 'Moscow', incorrect_answers: ['Saint Petersburg', 'Kiev', 'Warsaw'] },
    { question: 'How many hours are in a day?', correct_answer: '24', incorrect_answers: ['12', '36', '48'] },
    { question: 'What is the chemical symbol for oxygen?', correct_answer: 'O', incorrect_answers: ['Ox', 'O2', 'Oz'] },
    { question: 'Which bird is a symbol of peace?', correct_answer: 'Dove', incorrect_answers: ['Eagle', 'Owl', 'Pigeon'] },
    { question: 'What is the capital city of India?', correct_answer: 'New Delhi', incorrect_answers: ['Mumbai', 'Kolkata', 'Chennai'] },
    { question: 'What is the freezing point of water in Celsius?', correct_answer: '0', incorrect_answers: ['32', '100', '-10'] },
    { question: 'Which country is famous for its sushi?', correct_answer: 'Japan', incorrect_answers: ['China', 'South Korea', 'Thailand'] },
    { question: 'What is the capital city of South Africa?', correct_answer: 'Pretoria', incorrect_answers: ['Cape Town', 'Johannesburg', 'Durban'] },
    { question: 'What is the largest type of big cat?', correct_answer: 'Tiger', incorrect_answers: ['Lion', 'Leopard', 'Jaguar'] },
    { question: 'What is the capital city of Egypt?', correct_answer: 'Cairo', incorrect_answers: ['Alexandria', 'Giza', 'Luxor'] },
    { question: 'How many planets are in our solar system?', correct_answer: '8', incorrect_answers: ['9', '7', '10'] },
    { question: 'What is the chemical symbol for iron?', correct_answer: 'Fe', incorrect_answers: ['Ir', 'In', 'Io'] },
    { question: 'Which fruit is known as the "king of fruits"?', correct_answer: 'Durian', incorrect_answers: ['Mango', 'Pineapple', 'Banana'] },
    { question: 'What is the capital city of Canada?', correct_answer: 'Ottawa', incorrect_answers: ['Toronto', 'Vancouver', 'Montreal'] },
    { question: 'What is the largest bird in the world?', correct_answer: 'Ostrich', incorrect_answers: ['Emu', 'Rhea', 'Cassowary'] },
    { question: 'What is the chemical symbol for silver?', correct_answer: 'Ag', incorrect_answers: ['Au', 'Si', 'Sr'] },
    { question: 'Which country is famous for its pizza?', correct_answer: 'Italy', incorrect_answers: ['France', 'Spain', 'Greece'] },
    { question: 'What is the capital city of Brazil?', correct_answer: 'Brasília', incorrect_answers: ['Rio de Janeiro', 'São Paulo', 'Buenos Aires'] },
    { question: 'What is the fastest land animal?', correct_answer: 'Cheetah', incorrect_answers: ['Lion', 'Gazelle', 'Horse'] },
  ],
};

let state = {};
let manualMultiplier = 1;
let voiceEnabled = true;
let sfxEnabled = true;
let testMode = false;
let seenThrows = 0;
let questionTimer = null;
let pendingQuestion = null;
let throwLog = [];
let missTimer = null;

function freshState() {
  return {
    phase: 'r1',
    team: document.getElementById('team-name')?.value.trim() || 'The Contestants',
    cash: 0,
    prizes: [],
    selectedCategory: null,
    r1DartValue: 0,
    r2Score: 0,
    r2Cycle: 1,
    r2Cycles: 3,
    r3Darts: 0,
    finalScore: 0,
    finalDarts: 0,
    categories: CATEGORY_PAIRS.map(c => ({ ...c, active: true })),
    prizeSlots: buildPrizeBoard().map((name, i) => ({ slot: i + 1, name, won: false })),
    starPrize: pick(PRIZE_ENGINE.star_prizes),
    darts: [],
    gameOver: false,
  };
}

function buildPrizeBoard() {
  const lows = [...PRIZE_ENGINE.low_tier].sort(() => Math.random() - .5);
  const mids = [...PRIZE_ENGINE.mid_tier].sort(() => Math.random() - .5);
  return [lows[0], mids[0], lows[1], mids[1], lows[2], lows[3], mids[2], lows[4]];
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function escapeHTML(str) { return String(str).replace(/[&<>'"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[m])); }
function money(n) { return '&pound;' + Math.max(0, Math.round(n)); }
function questionId(q) { return `${q.question}|${q.correct_answer}`; }

function loadQuestionHistory() {
  try {
    return JSON.parse(localStorage.getItem(QUESTION_HISTORY_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveQuestionHistory(history) {
  try {
    localStorage.setItem(QUESTION_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {}
}

function nextQuestion(categoryId) {
  const externalBank = window.BULLSEYE_QUESTIONS || {};
  const questions = externalBank[categoryId] || FALLBACK_QUESTIONS[categoryId] || externalBank.general || FALLBACK_QUESTIONS.general;
  const ids = questions.map(questionId);
  const history = loadQuestionHistory();
  const used = Array.isArray(history[categoryId])
    ? history[categoryId].filter(id => ids.includes(id))
    : [];
  let unused = questions.filter(q => !used.includes(questionId(q)));

  if (!unused.length) {
    used.length = 0;
    unused = [...questions];
  }

  const q = pick(unused);
  used.push(questionId(q));
  history[categoryId] = used.slice(-questions.length);
  saveQuestionHistory(history);
  return q;
}

function startGame() {
  state = freshState();
  document.documentElement.requestFullscreen().catch(() => {});
  showScreen('game');
  initRoundOne();
}

function endGame() {
  clearQuestionTimer();
  state.gameOver = true;
  seenThrows = 0;
  showScreen('setup');
}

function initRoundOne() {
  resetManualMultiplier();
  state.phase = 'r1_choose';
  state.selectedCategory = null;
  state.r1DartValue = 0;
  state.darts = [];
  flash("Bully's Category Board", 'var(--gold)');
  renderAll();
  setTimeout(openCategoryChoice, 350);
}

function initRoundTwo() {
  resetManualMultiplier();
  state.phase = 'r2_throw';
  state.r2Cycle = 1;
  state.darts = [];
  state.r2Score = 0;
  flash("Bully's Pounds for Points", 'var(--gold)');
  renderAll();
}

function initRoundThree() {
  resetManualMultiplier();
  state.phase = 'r3';
  state.darts = [];
  state.r3Darts = 0;
  flash("Bully's Prize Board", 'var(--gold)');
  renderAll();
}

function nextPhase() {
  if (pendingQuestion) return;
  if (state.phase === 'r1_choose') return openCategoryChoice();
  if (state.phase === 'r1_throw') return initRoundTwo();
  if (state.phase === 'r2_throw') return finishRoundTwoThrows();
  if (state.phase === 'r2_done') return initRoundThree();
  if (state.phase === 'r3') return offerFinal();
  if (state.phase === 'final') return resolveFinal();
  if (state.phase === 'complete') return endGame();
}

function registerDart(seg) {
  if (!state.phase || state.gameOver || pendingQuestion) return;
  if (state.phase === 'r1_throw') return handleRoundOneDart(seg);
  if (state.phase === 'r2_throw') return handleRoundTwoDart(seg);
  if (state.phase === 'r3') return handleRoundThreeDart(seg);
  if (state.phase === 'final') return handleFinalDart(seg);
}

function handleRoundOneDart(seg) {
  const selected = selectedCategory();
  if (!selected) return openCategoryChoice();
  state.darts = [];
  const num = Number(seg && seg.number) || 0;
  if (num === 25) {
    state.r1DartValue = 200;
    state.cash += state.r1DartValue;
    addDart(seg, 'Bull - 200');
    sfxInOne();
    flash('Bull - 200', 'var(--gold)');
    return askQuestion(selected, 50, correct => {
      if (correct) state.cash += 50;
      setTimeout(initRoundTwo, 900);
    });
  }

  const matchedChoice = selected.numbers.includes(num);
  const hitCategory = matchedChoice
    ? selected
    : state.categories.find(c => c.id !== selected.id && c.numbers.includes(num));
  if (!hitCategory) {
    addDart(seg, 'No category');
    moo();
    flash('No category', 'var(--red)');
    return setTimeout(initRoundTwo, 900);
  }

  const value = matchedChoice ? categoryBoardValue(seg) : 0;
  state.r1DartValue = value;
  if (value) state.cash += value;
  addDart(seg, value ? `${hitCategory.name} - ${value}` : `${hitCategory.name} - bonus only`);
  flash(value ? `${hitCategory.name} - ${money(value).replace('&pound;', '£')}` : `${hitCategory.name} question`, value ? 'var(--gold)' : 'var(--blue)');
  askQuestion(hitCategory, 50, correct => {
    if (correct) state.cash += 50;
    setTimeout(initRoundTwo, 900);
  });
  renderAll();
}

function selectedCategory() {
  return state.categories.find(c => c.id === state.selectedCategory);
}

function categoryBoardValue(seg) {
  const multiplier = Number(seg && seg.multiplier) || 1;
  if (multiplier >= 3) return 100;
  if (multiplier >= 2) return 50;
  return 30;
}

function openCategoryChoice() {
  if (pendingQuestion || state.phase !== 'r1_choose') return;
  document.getElementById('choice-grid').innerHTML = state.categories
    .map(c => `<button class="choice-btn ${c.active ? '' : 'disabled'}" ${c.active ? `onclick="chooseRoundOneCategory('${c.id}')"` : 'disabled'}>${escapeHTML(c.name)}</button>`)
    .join('');
  document.getElementById('choice-modal').classList.add('open');
}

function chooseRoundOneCategory(id) {
  const category = state.categories.find(c => c.id === id);
  if (!category) return;
  document.getElementById('choice-modal').classList.remove('open');
  state.selectedCategory = id;
  category.active = false;
  state.phase = 'r1_throw';
  state.darts = [];
  flash(`Aim for ${category.name}`, 'var(--gold)');
  renderAll();
}

function handleRoundTwoDart(seg) {
  if (state.darts.length >= 3) return;
  const score = segScore(seg);
  state.r2Score += score;
  addDart(seg, String(score));
  if (sfxEnabled && !testMode) sfxHit();
  if (state.darts.length >= 3) setTimeout(finishRoundTwoThrows, 450);
  renderAll();
}

function finishRoundTwoThrows() {
  if (state.phase !== 'r2_throw') return;
  state.phase = 'r2_question';
  const value = state.r2Score;
  askQuestion({ id: 'general', name: 'General Knowledge' }, value, correct => {
    if (correct) state.cash += value;
    if (state.r2Cycle >= state.r2Cycles) {
      state.phase = 'r2_done';
      renderAll();
      setTimeout(initRoundThree, 1200);
    } else {
      state.r2Cycle++;
      state.phase = 'r2_throw';
      state.darts = [];
      state.r2Score = 0;
      flash("Next Pounds for Points throw", 'var(--gold)');
      renderAll();
    }
  });
  renderAll();
}

function handleRoundThreeDart(seg) {
  if (state.r3Darts >= 9) return;
  state.r3Darts++;
  const zone = prizeZone(seg);
  addDart(seg, zone.label);

  if (zone.type === 'miss') {
    moo();
  } else if (zone.type === 'bull') {
    state.prizes.push('Bully Special Prize');
    sfxInOne();
    flash("Bully's Special Prize", 'var(--gold)');
  } else if (zone.type === 'black') {
    if (sfxEnabled && !testMode) sfxBust();
    flash('Black Segment', 'var(--red)');
  } else {
    const slot = state.prizeSlots[zone.slot - 1];
    if (!slot.won) {
      slot.won = true;
      state.prizes.push(slot.name);
      sfxInOne();
      flash('Prize Won', 'var(--gold)');
    } else {
      if (sfxEnabled && !testMode) sfxBust();
      flash('Prize Already Won', 'var(--red)');
    }
  }

  if (state.r3Darts >= 9) setTimeout(offerFinal, 700);
  renderAll();
}

function handleFinalDart(seg) {
  if (state.finalDarts >= 6) return;
  const score = segScore(seg);
  state.finalDarts++;
  state.finalScore += score;
  addDart(seg, String(score));
  if (state.finalScore >= 101) return setTimeout(() => finishGame(true), 450);
  if (state.finalDarts >= 6) setTimeout(resolveFinal, 450);
  renderAll();
}

function offerFinal() {
  state.phase = 'final_offer';
  renderAll();
  document.getElementById('final-title').textContent = 'Gamble?';
  document.getElementById('final-copy').innerHTML = `Keep ${money(state.cash)} and ${state.prizes.length} prize${state.prizes.length === 1 ? '' : 's'}, or gamble for <strong>${escapeHTML(state.starPrize)}</strong>. Score 101 or more with 6 darts to win.`;
  document.getElementById('final-actions').innerHTML = '<button class="primary-btn" onclick="startFinal()">Gamble</button><button class="secondary-btn" onclick="finishGame(false)">Keep Prizes</button>';
  document.getElementById('final-modal').classList.add('open');
}

function startFinal() {
  document.getElementById('final-modal').classList.remove('open');
  resetManualMultiplier();
  state.phase = 'final';
  state.finalScore = 0;
  state.finalDarts = 0;
  state.darts = [];
  sfxInOne();
  renderAll();
}

function resolveFinal() {
  if (state.finalScore >= 101) return finishGame(true);
  state.cash = 0;
  state.prizes = [];
  if (sfxEnabled && !testMode) sfxBust();
  document.getElementById('final-title').textContent = 'Gamble lost';
  document.getElementById('final-copy').innerHTML = `${escapeHTML(state.team)} scored ${state.finalScore}. The star prize was <strong>${escapeHTML(state.starPrize)}</strong>.`;
  document.getElementById('final-actions').innerHTML = '<button class="primary-btn" onclick="finishGame(false)">Finish</button>';
  document.getElementById('final-modal').classList.add('open');
  renderAll();
}

function finishGame(starWon) {
  resetManualMultiplier();
  state.phase = 'complete';
  state.gameOver = true;
  document.getElementById('final-modal').classList.remove('open');
  if (starWon) {
    state.prizes.push(state.starPrize);
    spawnConfetti();
    flash('Star Prize Won!', 'var(--gold)');
  } else {
    flash('Game Complete', 'var(--gold)');
  }
  renderAll();
}

function addDart(seg, label) {
  state.darts.push({ label: isMiss(seg) ? 'Miss' : dartSpeak(seg), sub: label, score: segScore(seg), miss: isMiss(seg), seg });
}

function prizeZone(seg) {
  const num = Number(seg && seg.number) || 0;
  if (num === 25) return { type: 'bull', label: 'Special Prize' };
  const idx = CATEGORY_PAIRS.findIndex(c => c.numbers.includes(num));
  if (idx < 0 || idx >= 8) return { type: 'miss', label: 'Miss Zone' };
  const pair = CATEGORY_PAIRS[idx];
  if (num === pair.numbers[0]) return { type: 'red', slot: idx + 1, label: 'Prize ' + (idx + 1) };
  return { type: 'black', label: 'Black' };
}

async function askQuestion(category, value, callback) {
  pendingQuestion = { category, value, callback, answered: false };
  const q = nextQuestion(category.id);
  pendingQuestion.question = q;
  showQuestion(q, category, value);
}

function showQuestion(q, category, value) {
  document.getElementById('question-category').textContent = category.name;
  document.getElementById('question-value').innerHTML = money(value);
  document.getElementById('question-text').textContent = q.question;
  const answers = [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - .5);
  document.getElementById('answer-grid').innerHTML = answers.map(a => `<button class="answer-btn" data-answer="${escapeHTML(a)}" onclick="answerQuestion(this)">${escapeHTML(a)}</button>`).join('');
  document.getElementById('question-modal').classList.add('open');
  speakBullseye(q.question, true);
  startQuestionTimer();
}

function answerQuestion(btn, answer) {
  if (!pendingQuestion || pendingQuestion.answered) return;
  if (answer === undefined && btn) answer = btn.dataset.answer || '';
  pendingQuestion.answered = true;
  clearQuestionTimer();
  const correct = answer === pendingQuestion.question.correct_answer;
  document.querySelectorAll('.answer-btn').forEach(b => {
    if (b.textContent === pendingQuestion.question.correct_answer) b.classList.add('correct');
  });
  if (!correct && btn) btn.classList.add('wrong');
  if (correct) {
    if (sfxEnabled && !testMode) sfxCheckout();
    flash('Correct!', 'var(--green)');
    speakBullseye('Correct', true);
  } else {
    if (sfxEnabled && !testMode) sfxBust();
    flash('Wrong!', 'var(--red)');
    speakBullseye(`Wrong. The answer was ${pendingQuestion.question.correct_answer}.`, true);
  }
  const done = pendingQuestion.callback;
  setTimeout(() => {
    document.getElementById('question-modal').classList.remove('open');
    pendingQuestion = null;
    done(correct);
    renderAll();
  }, 1100);
}

function startQuestionTimer() {
  clearQuestionTimer();
  let remaining = 15;
  const el = document.getElementById('timer-ring');
  el.textContent = remaining;
  questionTimer = setInterval(() => {
    remaining--;
    el.textContent = remaining;
    if (remaining <= 5 && sfxEnabled && !testMode) sfxWarn();
    if (remaining <= 0) answerQuestion(null, '');
  }, 1000);
}

function clearQuestionTimer() {
  if (questionTimer) clearInterval(questionTimer);
  questionTimer = null;
}

function renderAll() {
  renderBoard();
  renderSidebars();
  renderManualGrid();
}

function renderBoard() {
  const svg = document.getElementById('bullseye-board');
  if (!svg) return;
  svg.innerHTML = '';
  const center = document.getElementById('board-center-readout');
  const wrap = svg.closest('.board-wrap');
  const phase = state.phase || 'r1';
  const isStandardBoard = !phase.startsWith('r1') && phase !== 'r3';
  if (wrap) wrap.classList.toggle('standard-board-active', isStandardBoard);
  svg.classList.toggle('standard-board-overlay', isStandardBoard);
  if (center) center.classList.add('hidden');
  if (phase.startsWith('r1')) renderCategoryBoard(svg);
  else if (phase === 'r3') renderPrizeBoard(svg);
  else renderStandardBoard(svg);
  renderDartMarkers(svg, phase);
}

function renderCategoryBoard(svg) {
  const cx = 210, cy = 210, step = 360 / CATEGORY_PAIRS.length;
  const outer = 198, labelInner = 166, labelOuter = 198, thirtyInner = 116, fiftyInner = 72, hundredInner = 42;
  CATEGORY_PAIRS.forEach((pair, i) => {
    const start = -90 + i * step, end = start + step - .8, midDeg = start + step / 2;
    const focus = state.selectedCategory
      ? (state.selectedCategory === pair.id ? ' selected-category' : ' dim-category')
      : (pair.active === false ? ' used-category' : '');
    svg.insertAdjacentHTML('beforeend', `<path class="board-segment board-category-band${focus}" d="${ringSlicePath(cx, cy, labelInner, labelOuter, start, end)}"></path>`);
    svg.insertAdjacentHTML('beforeend', `<path class="board-segment board-30${focus}" d="${ringSlicePath(cx, cy, thirtyInner, labelInner, start, end)}"></path>`);
    svg.insertAdjacentHTML('beforeend', `<path class="board-segment board-50${focus}" d="${ringSlicePath(cx, cy, fiftyInner, thirtyInner, start, end)}"></path>`);
    svg.insertAdjacentHTML('beforeend', `<path class="board-segment board-100${focus}" d="${ringSlicePath(cx, cy, hundredInner, fiftyInner, start, end)}"></path>`);
    const label = polar(cx, cy, 181, midDeg);
    const value30 = polar(cx, cy, 141, midDeg);
    const value50 = polar(cx, cy, 94, midDeg);
    const value100 = polar(cx, cy, 56, midDeg);
    svg.insertAdjacentHTML('beforeend', `<text class="board-label category-label" x="${label.x}" y="${label.y}" transform="rotate(${midDeg + 90} ${label.x} ${label.y})">${escapeHTML(pair.name)}</text>`);
    if (i % 2 === 0) {
      svg.insertAdjacentHTML('beforeend', `<text class="board-label value-label muted-value" x="${value30.x}" y="${value30.y}">30</text>`);
      svg.insertAdjacentHTML('beforeend', `<text class="board-label value-label muted-value" x="${value50.x}" y="${value50.y}">50</text>`);
      svg.insertAdjacentHTML('beforeend', `<text class="board-label value-label muted-value" x="${value100.x}" y="${value100.y}">100</text>`);
    }
  });
  svg.insertAdjacentHTML('beforeend', '<circle cx="210" cy="210" r="41" class="board-bull-outer"></circle><circle cx="210" cy="210" r="20" class="board-bull-inner"></circle><text class="board-label bull-value" x="210" y="214">200</text>');
}

function renderPrizeBoard(svg) {
  const cx = 210, cy = 210, outer = 194, inner = 32, step = 360 / 8;
  for (let i = 0; i < 8; i++) {
    const start = -90 + i * step, end = start + step - 1.4, midDeg = start + step / 2;
    const label = polar(cx, cy, 160, midDeg);
    const red = i % 2 === 0;
    svg.insertAdjacentHTML('beforeend', `<path class="board-segment ${red ? 'prize-red' : 'prize-black'}" d="${ringSlicePath(cx, cy, inner, outer, start, end)}"></path>`);
    svg.insertAdjacentHTML('beforeend', `<path class="board-segment prize-inner-slice" d="${ringSlicePath(cx, cy, inner, outer - 62, start + step * .38, end)}"></path>`);
    svg.insertAdjacentHTML('beforeend', `<text class="board-label prize-label" x="${label.x}" y="${label.y}">${i + 1}</text>`);
  }
  svg.insertAdjacentHTML('beforeend', '<circle cx="210" cy="210" r="32" class="prize-hub"></circle>');
}

function renderStandardBoard(svg) {
  svg.insertAdjacentHTML('beforeend', '<circle cx="210" cy="210" r="207" class="standard-board-hit-area"></circle>');
}

function renderDartMarkers(svg, phase) {
  (state.darts || []).forEach((dart, index) => {
    const point = dartMarkerPoint(dart.seg, index, phase);
    if (!point) return;
    const rot = point.angle + 38;
    const miss = dart.miss ? ' miss' : '';
    svg.insertAdjacentHTML('beforeend', `
      <g class="dart-marker${miss}" transform="translate(${point.x} ${point.y}) rotate(${rot})">
        <line class="dart-shadow" x1="-27" y1="13" x2="6" y2="-2"></line>
        <line class="dart-shaft" x1="-30" y1="10" x2="5" y2="-2"></line>
        <path class="dart-flight" d="M -33 8 L -45 1 L -40 15 Z"></path>
        <circle class="dart-pin" cx="5" cy="-2" r="5"></circle>
        <text class="dart-count" x="-21" y="-9" transform="rotate(${-rot} -21 -9)">${index + 1}</text>
      </g>`);
  });
}

function dartMarkerPoint(seg, index, phase) {
  if (isMiss(seg)) return { x: 332 + index * 12, y: 72 + index * 12, angle: 45 };
  const num = Number(seg && seg.number) || 0;
  const mult = Number(seg && seg.multiplier) || 1;
  if (num === 25) {
    const nudge = [[0, 0], [10, -4], [-8, 7], [4, 11], [-11, -5], [12, 8]][index % 6];
    return { x: 210 + nudge[0], y: 210 + nudge[1], angle: 25 + index * 18 };
  }

  if (phase && phase.startsWith('r1')) {
    const idx = CATEGORY_PAIRS.findIndex(c => c.numbers.includes(num));
    if (idx < 0) return null;
    return pointOnBoard(idx, CATEGORY_PAIRS.length, mult >= 3 ? 57 : mult >= 2 ? 93 : 139, index);
  }

  if (phase === 'r3') {
    const idx = CATEGORY_PAIRS.findIndex(c => c.numbers.includes(num));
    if (idx < 0 || idx >= 8) return null;
    return pointOnBoard(idx, 8, 128, index);
  }

  const idx = STANDARD_NUMBERS.indexOf(num);
  if (idx < 0) return null;
  const radius = mult >= 3 ? 111 : mult >= 2 ? 181 : 145;
  return pointOnBoard(idx, STANDARD_NUMBERS.length, radius, index);
}

function pointOnBoard(index, total, radius, dartIndex) {
  const step = 360 / total;
  const angle = -90 + index * step + step / 2;
  const jitter = (dartIndex % 3 - 1) * 5;
  return { ...polar(210, 210, radius + jitter, angle), angle };
}

function ringSlicePath(cx, cy, r0, r1, a0, a1) {
  const p0 = polar(cx, cy, r1, a0), p1 = polar(cx, cy, r1, a1), p2 = polar(cx, cy, r0, a1), p3 = polar(cx, cy, r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r1} ${r1} 0 ${large} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${r0} ${r0} 0 ${large} 0 ${p3.x} ${p3.y} Z`;
}

function polar(cx, cy, r, deg) {
  const rad = deg * Math.PI / 180;
  return { x: +(cx + r * Math.cos(rad)).toFixed(2), y: +(cy + r * Math.sin(rad)).toFixed(2) };
}

function renderSidebars() {
  if (!document.getElementById('bank-total')) return;
  document.getElementById('display-team').textContent = state.team || 'The Contestants';
  document.getElementById('bank-total').innerHTML = money(state.cash || 0);
  const inv = document.getElementById('inventory-list');
  inv.innerHTML = state.prizes && state.prizes.length
    ? state.prizes.map((p, i) => `<div class="inventory-item"><span>${i + 1}</span><span>${escapeHTML(p)}</span><span>Won</span></div>`).join('')
    : '<div class="inventory-empty">No prizes yet. Keep out of the black and in the red.</div>';

  const phaseText = phaseLabel(state.phase || 'r1');
  document.getElementById('round-title').textContent = phaseText.round;
  document.getElementById('round-title-panel').textContent = phaseText.target;
  document.getElementById('target-copy').innerHTML = phaseText.copy;
  document.getElementById('center-target').textContent = phaseText.center;
  document.getElementById('round-list').innerHTML = [['r1', "Bully's Category Board"], ['r2', "Bully's Pounds for Points"], ['r3', "Bully's Prize Board"], ['final', 'Star Prize Gamble']]
    .map(([key, label]) => `<div class="round-chip ${state.phase && state.phase.startsWith(key) ? 'active' : ''}"><span>${label}</span><span>${roundStatus(key)}</span></div>`).join('');

  const phase = state.phase || 'r1';
  const max = phase === 'final' ? 6 : (phase === 'r3' ? 9 : 3);
  const darts = state.darts || [];
  document.getElementById('dart-slots').innerHTML = Array.from({ length: max }, (_, i) => {
    const d = darts[i];
    return `<div class="dart-slot ${d ? (d.miss ? 'miss' : 'hit') : ''}"><span>${i + 1}</span><span>${d ? `${escapeHTML(d.label)} - ${escapeHTML(d.sub)}` : '-'}</span></div>`;
  }).join('');
  const total = phase === 'final' ? state.finalScore : phase === 'r2_throw' ? state.r2Score : phase === 'r3' ? state.r3Darts : darts.length;
  document.getElementById('turn-total').textContent = phase === 'r3' ? `Darts: ${total}/9` : (phase === 'final' ? `Score: ${total || 0}` : `Total: ${total || 0}`);
}

function phaseLabel(phase) {
  const selected = selectedCategory();
  if (phase === 'r1_choose') return { round: 'Round 1 - Category Board', target: 'Choose a category', center: 'Category', copy: 'Pick the category first. Then throw for that section, or hit bull for 200.' };
  if (phase === 'r1_throw') return { round: 'Round 1 - Category Board', target: `Aim for ${selected ? selected.name : 'category'}`, center: 'Category', copy: selected ? categoryGuide(selected) : 'Choose a category first.' };
  if (phase === 'r2_throw') return { round: `Round 2 - Bully's Pounds for Points ${state.r2Cycle}/${state.r2Cycles}`, target: 'Score as high as possible', center: 'Score', copy: 'Throw three darts on the standard board. A correct answer adds that score to the bank.' };
  if (phase === 'r2_question') return { round: "Round 2 - Bully's Pounds for Points", target: `Question for ${money(state.r2Score)}`, center: 'Quiz', copy: 'Correct answer adds the dart score to the bank. Wrong answer scores nothing.' };
  if (phase === 'r2_done') return { round: 'Round 2 Complete', target: 'Prize board next', center: 'Prizes', copy: 'The cash is banked. Now try to win prizes on the red sectors.' };
  if (phase === 'r3') return { round: 'Round 3 - Prize Board', target: 'Prize board', center: 'Prizes', copy: 'Red wins a prize. Black wins nothing. Already-won red sectors are wasted darts.' };
  if (phase === 'final_offer') return { round: 'Final - Star Prize Gamble', target: 'Gamble decision', center: 'Gamble', copy: `The star prize is ${state.starPrize}.` };
  if (phase === 'final') return { round: 'Final - Star Prize Gamble', target: 'Score 101+', center: '101+', copy: `Six darts for the ${state.starPrize}. Current score: ${state.finalScore}.` };
  if (phase === 'complete') return { round: 'Game Complete', target: 'Game complete', center: 'Done', copy: 'Return to the menu or start again.' };
  return { round: 'Bullseye', target: 'Ready', center: 'Ready', copy: 'Start the game.' };
}

function categoryGuide(category) {
  return `
    <div class="target-guide">
      <div><strong>Numbers</strong><span>${category.numbers.join(', ')}</span></div>
      <div><strong>Doubles</strong><span>${category.double}</span></div>
      <div><strong>Outer Segment</strong><span>30</span></div>
      <div><strong>Treble</strong><span>50</span></div>
      <div><strong>Inner Segment</strong><span>100</span></div>
      <div><strong>Bull</strong><span>200</span></div>
    </div>
  `;
}

function roundStatus(key) {
  const phase = state.phase || 'r1';
  const order = { r1: 1, r2: 2, r3: 3, final: 4 };
  const current = phase.startsWith('r2') ? 2 : phase.startsWith('r3') ? 3 : phase.startsWith('final') || phase === 'complete' ? 4 : 1;
  if (phase === 'complete') return 'Done';
  if (order[key] < current) return 'Done';
  if (order[key] === current) return 'Live';
  return 'Next';
}

function renderManualGrid() {
  const grid = document.getElementById('manual-grid');
  if (!grid || grid.dataset.ready) return;
  grid.innerHTML = Array.from({ length: 20 }, (_, i) => `<button class="num-btn" onclick="manualDart(${i + 1})">${i + 1}</button>`).join('') +
    '<button class="num-btn" onclick="manualDart(25)">Bull</button><button class="num-btn" onclick="manualDart(50)">Bullseye</button>';
  grid.dataset.ready = '1';
}

function setManualMultiplier(multiplier) {
  manualMultiplier = manualMultiplier === multiplier ? 1 : multiplier;
  document.getElementById('mod-double').classList.toggle('active', manualMultiplier === 2);
  document.getElementById('mod-treble').classList.toggle('active', manualMultiplier === 3);
}

function resetManualMultiplier() {
  manualMultiplier = 1;
  const doubleBtn = document.getElementById('mod-double');
  const trebleBtn = document.getElementById('mod-treble');
  if (doubleBtn) doubleBtn.classList.remove('active');
  if (trebleBtn) trebleBtn.classList.remove('active');
}

function manualDart(num) {
  if (num === 0) registerDart(null);
  else {
    const multiplier = num === 50 ? 2 : (num === 25 ? 1 : manualMultiplier);
    const number = num === 50 ? 25 : num;
    registerDart({ number, multiplier, name: number === 25 ? (multiplier === 2 ? 'D25' : 'B25') : `${multiplier === 3 ? 'T' : multiplier === 2 ? 'D' : 'S'}${number}` });
  }
  resetManualMultiplier();
}

function handleWS(data) {
  if (!data || data.type !== 'state') return;
  const d = data.data || {};
  const throws = Array.isArray(d.throws) ? d.throws : [];
  const event = d.event || '';
  const numThrows = d.numThrows !== undefined ? d.numThrows : -1;
  if (throws.length > seenThrows && !pendingQuestion) {
    const rawThrow = throws[seenThrows];
    throwLog.push(rawThrow);
    if (missTimer) { clearTimeout(missTimer); missTimer = null; }
    registerDart(rawThrow.segment || {});
    seenThrows = throws.length;
  }
  if (numThrows > 0 && numThrows > seenThrows && throws.length === seenThrows && !pendingQuestion) {
    if (!missTimer) missTimer = setTimeout(() => {
      missTimer = null;
      if (seenThrows < numThrows) {
        registerDart(null);
        seenThrows = numThrows;
      }
    }, 700);
  }
  if (event === 'Takeout finished' || (throws.length === 0 && seenThrows > 0)) seenThrows = 0;
}

function flash(text, color = 'var(--gold)') {
  const el = document.getElementById('announce');
  el.textContent = text;
  el.style.color = color;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(flash._timer);
  flash._timer = setTimeout(() => el.classList.remove('show'), 1300);
}

function moo() {
  if (!sfxEnabled || testMode) return;
  const ctx = gAC(), t = ctx.currentTime;
  tone(165, 'sawtooth', t, .32, .18, ctx);
  tone(123, 'sawtooth', t + .22, .38, .15, ctx);
  noiz(t, .22, .04, 220, ctx);
}

function sfxInOne() {
  if (sfxEnabled && !testMode) sfxCheckout();
}

function setVoiceEnabled(val) {
  voiceEnabled = val;
  if (!val) cancelSpeech();
  try { localStorage.setItem('dartbot_voice_enabled', val ? '1' : '0'); } catch {}
}

function setSfxEnabled(val) {
  sfxEnabled = val;
  try { localStorage.setItem('dartbot_sfx_enabled', val ? '1' : '0'); } catch {}
}

function setTestMode(val) {
  testMode = val;
  if (val) cancelSpeech();
}

function speakBullseye(text, interrupt = false) {
  if (!voiceEnabled || testMode) return;
  speak(text, interrupt);
}

document.addEventListener('DOMContentLoaded', () => {
  state = freshState();
  voiceEnabled = localStorage.getItem('dartbot_voice_enabled') !== '0';
  sfxEnabled = localStorage.getItem('dartbot_sfx_enabled') !== '0';
  const voiceChk = document.getElementById('voice-toggle');
  const sfxChk = document.getElementById('sfx-toggle');
  const testChk = document.getElementById('test-mode-toggle');
  if (voiceChk) voiceChk.checked = voiceEnabled;
  if (sfxChk) sfxChk.checked = sfxEnabled;
  if (testChk) testChk.checked = false;
  renderManualGrid();
  initSpeech();
  initAutodarts(handleWS);
  renderAll();
});
