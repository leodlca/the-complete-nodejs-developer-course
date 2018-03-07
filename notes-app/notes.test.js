
const faker = require('faker');
const notes = require('./notes');

describe('Notes', () => {

    const ITERATIONS = 10;

    describe('#basic', () => {

        test('reset command', () => {
            expect(notes.resetNotes()).toEqual(0);
            expect(notes.listNotes()).toEqual([]);
        });
    
        test('add command', () => {
            for(let i = 1; i <= ITERATIONS; i++) {
                expect(notes.addNote(`test_${i}`, `test_${i}`)).toEqual(0);
            }
        });
    
        test('list command', () => {
            expect(notes.listNotes().length).toEqual(ITERATIONS);
        });
    
        test('read command', () => {
            for(let i = 1; i <= ITERATIONS; i++) {
                expect(notes.readNote(`test_${i}`)).toEqual(`test_${i}`);
            }
        });
    
        test('remove command', () => {
            for(let i = 1; i <= ITERATIONS; i++) {
                expect(notes.removeNote(`test_${i}`)).toEqual(0);
            }
        });
    
        test('reset command (2)', () => {
            expect(notes.resetNotes()).toEqual(0);
            expect(notes.listNotes()).toEqual([]);
        });

    });

    describe('#random', () => {

        let files = [];
        const ITERATIONS = 10;

        for(let i = 1; i <= ITERATIONS; i++) {

            test(`[${i}/${ITERATIONS}] add command`, () => {
                let fileName = faker.system.fileName();
                let fileBody = faker.lorem.sentence();
                expect(notes.addNote(fileName, fileBody)).toEqual(0);

                files.push({
                    title: fileName, 
                    body: fileBody
                });
            });
            
        }

        for(let i = 0; i < ITERATIONS; i++) {

            test(`[${i+1}/${ITERATIONS}] read command`, () => {
                expect(notes.readNote(files[i].title)).toEqual(files[i].body);
            });

        }

        for(let i = 0; i < ITERATIONS; i++) {

            test(`[${i+1}/${ITERATIONS}] list command`, () => {
                const notesList = notes.listNotes();
                expect(notesList.length).toEqual(ITERATIONS);
                expect(notesList).toContain(files[i].title)
            });

        }

        for(let i = 0; i < ITERATIONS; i++) {

            test(`[${i+1}/${ITERATIONS}] remove command`, () => {
                const fileName = files[i].title;
                expect(notes.removeNote(fileName)).toEqual(0);
                expect(notes.listNotes().length).toEqual(ITERATIONS - (i+1));
                expect(notes.listNotes()).not.toContain(fileName);
            });

        }

        test('reset command (3)', () => {
            expect(notes.resetNotes()).toEqual(0);
            expect(notes.listNotes()).toEqual([]);
        });

    });

});