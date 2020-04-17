const db = require('../data/db-config')


module.exports = {
    find,
    findById,
    findSteps,
    add, 
    update,
    remove
}

//resovles to all schemes
function find(){
    return db('schemes', 'steps');
    
}

//resolves to array of single schemes or null
function findById(id){
    return db('schemes', 'steps').where({id});
}

function findSteps(scheme_id){
        return db("steps as p")
            .join('schemes as s', 'p.scheme_id', 's.id')
            .select("p.id", "s.scheme_name", "p.step_number", "p.instructions")
            .where({ scheme_id })
// function findSteps(scheme_id){
//      return db('schemes')
//           .join('steps as s', 's.scheme_name', 's.step_number', 's.instructions')
//           .select('schemes.id', 'scheme_id')
//           .where({scheme_id})
// }
}

function add(scheme){
    return db('schemes')
    .insert(scheme)
    .then(item => {
        return findById(item[0]);
    })
}

function update(changes, id){
    return db('schemes')
        .where({id})
        .update(changes);
}

function remove(id){
    return db('schemes')
        .where('id', id)
        .del();
}