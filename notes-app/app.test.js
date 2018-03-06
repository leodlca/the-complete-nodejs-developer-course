
const faker = require('faker');
const notes = require('./notes');

const basicIOTests = () => {

    const ITERATIONS = 100;

    test('[CLEAR] reset command', () => {
        expect(notes.resetNotes()).toEqual(0);
        expect(notes.listNotes()).toEqual([]);
    });

    test('[BASIC] add command', () => {
        for(let i = 1; i <= ITERATIONS; i++) {
            expect(notes.addNote(`test_${i}`, `test_${i}`)).toEqual(0);
        }
    });

    test('[BASIC] list command', () => {
        expect(notes.listNotes().length).toEqual(ITERATIONS);
    });

    test('[BASIC] read command', () => {
        for(let i = 1; i <= ITERATIONS; i++) {
            expect(notes.readNote(`test_${i}`)).toEqual(`test_${i}`);
        }
    });

    test('[BASIC] remove command', () => {
        for(let i = 1; i <= ITERATIONS; i++) {
            expect(notes.removeNote(`test_${i}`)).toEqual(0);
        }
    });

    test('[CLEAR] reset command [2]', () => {
        expect(notes.resetNotes()).toEqual(0);
        expect(notes.listNotes()).toEqual([]);
    });

}

const randomIOTests = () => {
    
    let files = [];
    const ITERATIONS = 100;

    for(let i = 1; i <= ITERATIONS; i++) {

        test(`[RANDOM ${i}/${ITERATIONS}] add command`, () => {
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

        test(`[RANDOM ${i+1}/${ITERATIONS}] read command`, () => {
            expect(notes.readNote(files[i].title)).toEqual(files[i].body);
        });

    }

    for(let i = 0; i < ITERATIONS; i++) {

        test(`[RANDOM ${i+1}/${ITERATIONS}] list command`, () => {
            const notesList = notes.listNotes();
            expect(notesList.length).toEqual(ITERATIONS);
            expect(notesList).toContain(files[i].title)
        });

    }

    for(let i = 0; i < ITERATIONS; i++) {

        test(`[RANDOM ${i+1}/${ITERATIONS} remove command`, () => {
            const fileName = files[i].title;
            expect(notes.removeNote(fileName)).toEqual(0);
            expect(notes.listNotes().length).toEqual(ITERATIONS - (i+1));
            expect(notes.listNotes()).not.toContain(fileName);
        });

    }

    test('[CLEAR] reset command [3]', () => {
        expect(notes.resetNotes()).toEqual(0);
        expect(notes.listNotes()).toEqual([]);
    });

}

console.log = () => {}
basicIOTests();
randomIOTests();