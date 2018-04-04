import Loki from 'lokijs';

//创建一个数据库
export const db = new Loki('notes', {
	autoload: true,
	autosave: true,
	autosaveInterval: 3000,
	autoloadCallback: databaseInitialize,
	persistenceMethod: 'localStorage'
});

function databaseInitialize(){
	const notes = db.getCollection('notes');

	if(notes === null) {
		db.addCollection('notes');
	}
}

export function loadCollection(collection){
	return new Promise(resolve => {
		db.loadDatabase({}, ()=>{
			const _collection = db.getCollection(collection) || db.addCollection(collection);
			resolve(_collection);
		})
	})

}
