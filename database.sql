CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"description" VARCHAR (250) NOT NULL,
	"isComplete" BOOLEAN DEFAULT FALSE
);

SELECT * FROM "tasks";
DROP TABLE;

-- Test Value Entered
INSERT INTO "tasks" 
	("name", "description") VALUES ('Homework', 'Finish Assignment for Monday')  RETURNING "id", "name", "description", "isComplete";