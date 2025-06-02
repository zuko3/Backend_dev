## Sequence Diagram

# Participants

Participants in a sequence diagram can be objects within the system, external systems, or even external hardware. They are the entities that interact with each other by exchanging messages.

# Actors

Actors are a specific type of participant, usually representing users or external entities that interact with the system

# Lifelines:

Participants are represented by lifelines in the sequence diagram, which are vertical dashed lines that show the duration of their involvement in the interaction. Actors also have lifelines.

# Messages

Horizontal arrows between lifelines, showing the communication (method calls, signals, returns) between participants. Solid arrows are for calls; dashed arrows for return messages

# Activation Bars

Thin rectangles on lifelines indicating when an object is active or controlling the process

# Fragments

A fragment is a box in a sequence diagram that shows special situations, like choices (if/else), repeating actions (loops), or optional steps.
alt = if/else, opt = if, loop = repeat

# Scenario

A librarian creates a new user account in an online library system.

# Participants

    - Librarian (actor)
    - Online Library Management System
    - User Credentials Database
    - Email System

# Steps

    - Librarian initiates account creation by sending a request to the Library System.
    - Library System validates the input and sends a request to the User Credentials Database to create the account.
    - Database confirms account creation and returns success to the Library System.
    - Library System sends a welcome email via the Email System.
    - Email System confirms email sent.

# Diagram Representation (Textual)

    - Librarian -> LibrarySystem: createAccount(userDetails)
    - LibrarySystem -> UserCredentialsDB: addUser(userDetails)
    - UserCredentialsDB --> LibrarySystem: success
    - LibrarySystem -> EmailSystem: sendWelcomeEmail(userEmail)
    - EmailSystem --> LibrarySystem: emailSent
    - LibrarySystem --> Librarian: accountCreated

```
Librarian        LibrarySystem        UserCredentialsDB        EmailSystem
    |                  |                      |                     |
    |--createAccount-->|                      |                     |
    |                  |--addUser-----------> |                     |
    |                  |                      |                     |
    |                  |<------success------- |                     |
    |                  |                      |                     |
    |                  |--sendWelcomeEmail--> |                     |
    |                  |                      |<-----emailSent----- |
    |<---accountCreated|                      |                     |
    |                  |                      |                     |

```

# Useful links

https://mermaid.js.org/syntax/sequenceDiagram.html
