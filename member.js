function skillsMember() {
    var member = {
        name: 'John Doe',
        role: 'Frontend Developer',
        skills: ['HTML', 'CSS', 'JS'],
        details: function () {
            console.log(this.name + ' is a ' + this.role + ' and knows ' + this.skills.join(', '));
        }
    };

    return member;
}