function solve() {


    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };
    const Validator = {
        validateName(x){
            if (typeof x !== 'string') {
                throw 'Name must be string!';
            }
        },
        validateLength(x){
            if (x.length < 2 || x.length > 20) {
                throw Error('Name must be between between 2 and 20 symbols long!');
            }
        },
        validateSymbol(x){
            if (x.match(/[^a-zA-Z ]/)){     //[^A-Za-z ]/.test(x)) {
                throw Error('Name can contain only latin symbols and whitespaces!');
            }
        },
        validateMana(x){
            if (typeof x !== 'number' || x < 1 || Number.isNaN(x)) {
                throw Error('Mana must be a positive integer number!');
            }
        },
        validateEffect(x){
            if (typeof x !== 'function' || x.length !== 1) {
                throw Error('Effect must be a function with 1 parameter!');
            }
        },
        isValidAlignment(x){
            if (x !== 'good' && x !== 'neutral' && x !== 'evil') {
                throw Error('Alignment must be good, neutral or evil!');
            }
        },
        validaDamage(x){
            if (typeof x !== 'number' || x < 1 || x >= 100 || Number.isNaN(x)) {
                throw Error('Damage must be a positive number that is at most 100!');
            }
        },
        validateHealth(x){
            if (typeof x !== 'number' || x < 1 || x >= 200 || Number.isNaN(x)) {
                throw Error('Health must be a positive number that is at most 200!');
            }
        },
        validateSpeed(x){
            if (typeof x !== 'number' || x < 0 || x >= 100 || Number.isNaN(x)) {
                throw Error('Speed must be a positive number that is at most 100!');
            }
        },
        validateCount(x){
            if ((typeof x !== 'number') || (x < 1) ||((x | 0) !== x )|| Number.isNaN(x)) {
                throw Error('Count must be a positive integer number!');
            }
        },
        // validateSpellObject(x){
        //     if (!(x instanceof Spell)) {
        //         throw ERROR_MESSAGES.INVALID_SPELL_OBJECT;
        //     }
        // },
        validateNotEnoughMana(){

        },
        validateTargetNotFound(){

        },
        validateBattleParticipant(){

        }
    };
    const getId = (function () {
        let id = 0;
        return function () {
            id += 1;
            return id;
        }
    }());
    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name() {
            return this._name;
        }

        set name(name) {
            Validator.validateName(name);
            Validator.validateLength(name);
            Validator.validateSymbol(name);
            this._name = name;
        }

        get manaCost() {
            return this._manaCost;
        }

        set manaCost(manaCost) {
            Validator.validateMana(manaCost);
            this._manaCost = manaCost;
        }

        get effect() {
            return this._effect;
        }

        set effect(effect) {
            Validator.validateEffect(effect);
            this._effect = effect;
        }
    }
    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }

        get name() {
            return this._name;
        }

        set name(name) {
            Validator.validateName(name);
            Validator.validateLength(name);
            Validator.validateSymbol(name);
            this._name = name;
        }

        get alignment() {
            return this._alignment;
        }

        set alignment(alignment) {
            Validator.isValidAlignment(alignment);
            this._alignment = alignment;
        }
    }
    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);
            this.id = getId();
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }

        get damage() {
            return this._damage;
        }

        set damage(damage) {
            Validator.validaDamage(damage);
            this._damage = damage;
        }

        get health() {
            return this._damage;
        }

        set health(health) {
            Validator.validateHealth(health);
            this._health = health;
        }

        get count() {
            return this._count;
        }

        set count(count) {
            Validator.validateCount(count);
            this._count = count;
        }

        get speed() {
            return this._speed;
        }

        set speed(speed) {
            Validator.validateSpeed(speed);
            this._speed = speed;
        }

    }
    class Commander extends Unit {
        constructor(name, alignment, mana, spellbook, army) {
            super(name, alignment);
            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }

        get mana() {
            return this._mana;
        }

        set mana(mana) {
            Validator.validateMana(mana);
            this._mana = mana;
        }
    }
    let _commanders = [];
    let _armyUnits=[];

    const battlemanager ={
        getCommander(name, alignment, mana) {
            return new Commander(name, alignment, mana)
        },

        getArmyUnit(options) {
            const {name, alignment, damage, health, count, speed}=options;
            return new ArmyUnit(name, alignment, damage, health, count, speed)
        },

        getSpell(name, manaCost, effect) {

            return new Spell(name, manaCost, effect)
        },

        addCommanders(...commanders) {
            _commanders.push(...commanders);
            return this;
        },

        addArmyUnitTo(commanderName, armyUnit) {
            _commanders.find(c=>c.name === commanderName).army.push(armyUnit);
            _armyUnits.push(armyUnit);
            return this;
        },

        addSpellsTo(commanderName, ...spells) {

            try {
                _commanders
                    .find(c => c.name === commanderName)
                    .spellbook.push(...(spells.map(s => new Spell(s.name, s.manaCost, s.effect))));
            }
            catch (e) {
                throw Error('Passed objects must be Spell-like objects!');
            }


            return this;

        },

        findCommanders(query) {
            let result = _commanders.filter(c=>Object.keys(query).every(p=>query[p] === c[p])).sort(c=>c.name);
            return result;
        },

        findArmyUnitById(id) {

            let result = _armyUnits.filter(u=>u.id === id);
            if (result === []) {
                return undefined
            }
            return result


        },

        findArmyUnits(query) {

            let result = _armyUnits.filter(c=>Object.keys(query).every(p=>query[p] === c[p])).sort((x,y)=>{const cmp =y.speed-x.speed;if(cmp===0){return x.name.localeCompare(y.name);}return cmp});


            return result;
        },

        spellcast(casterName, spellName, targetUnitId) {


            let commander = _commanders.find(c=>c.name === casterName);
            if (typeof commander === 'undefined') {
                throw Error("Can\'t cast with non-existant commander " + casterName + "!");
            }

            let spell = commander.spellbook.find(c=>c.name === spellName);
            if (typeof spell === 'undefined') {
                throw Error(casterName + " doesn\'t know " + spellName);
            }
            let commandersArmy = [];
            for (let a of _commanders) {
                if (a.army.length !== 0) {
                    commandersArmy.push(a.army[0]);
                }
            }
            let targetArmy = commandersArmy.find(c=>c.id === targetUnitId);//console.log(targetArmy);
            if (commander.mana <spell.manaCost) {
                throw Error('Not enough mana!');
            }
            if (typeof targetArmy === 'undefined') {
                throw Error('Target not found!');
            }

            commander.mana -= spell.manaCost;
            spell.effect(targetArmy);
            return this;
        },


        battle(attacker, defender) {
 if (!(attacker instanceof ArmyUnit) || !(defender instanceof ArmyUnit)) {
 throw Error('Battle participants must be ArmyUnit-like!');
 }
            let totalDamage = attacker.damage * attacker.count;
            let totalHealth = defender.health * defender.count;
            totalHealth -= totalDamage;
            defender.count = Math.ceil(totalHealth / defender.health);

            if(defender.count < 0) {
                defender.count = 0;
            }

            return this;

        }
    };


    return battlemanager;
}
