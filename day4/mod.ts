const text = (await Deno.readTextFile('input.txt')).trim()

const passportRecords = text.split('\n\n').map(line => line.replaceAll('\n', ' '))

const passports = passportRecords.map(
  record => record.split(' ').map(
    field => field.split(':')
  ).reduce(
    (acc: Record<string, string>, [ name, value ]) => {
      acc[name] = value

      return acc
    },
    {}
  )
)

console.log(`#1 Found ${passports.filter(
  passport =>
    passport.byr &&
    passport.iyr &&
    passport.eyr &&
    passport.hgt &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
).length} valid passports`)


console.log(`#2 Found ${passports.filter(
  passport => {
    if(passport.byr) {
      if(passport.byr.length !== 4) {
        return false
      }

      const year = parseInt(passport.byr)

      if(isNaN(year) || year < 1920 || year > 2002) {
        return false
      }
    } else {
      return false
    }

    if(passport.iyr) {
      if(passport.iyr.length !== 4) {
        return false
      }

      const year = parseInt(passport.iyr)

      if(isNaN(year) || year < 2010 || year > 2020) {
        return false
      }
    } else {
      return false
    }

    if(passport.eyr) {
      if(passport.eyr.length !== 4) {
        return false
      }

      const year = parseInt(passport.eyr)

      if(isNaN(year) || year < 2020 || year > 2030) {
        return false
      }
    } else {
      return false
    }

    if(passport.hgt) {
      if(/\d+in/.test(passport.hgt)) {
        const inch = parseInt(passport.hgt)

        if(inch < 59 || inch > 76) {
          return false
        }
      } else if(/\d+cm/.test(passport.hgt)) {
        const cm = parseInt(passport.hgt)

        if(cm < 150 || cm > 193) {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }

    if(passport.hcl) {
      if(!/^#[0-9a-f]{6}$/i.test(passport.hcl)) {
        return false
      }
    } else {
      return false
    }

    if(passport.ecl) {
      if(!(passport.ecl in { amb: 1, blu: 1, brn: 1, gry: 1, grn: 1, hzl: 1, oth: 1, })) {
        return false
      }
    } else {
      return false
    }

    if(passport.pid) {
      if(!/^\d{9}$/.test(passport.pid)) {
        return false
      }
    } else {
      return false
    }

    return true
  }
).length} valid passports`)
