# Vault

The Vault (:tm: *patient pending*) helps everyone manage complex bank account/routing numbers. 

This simple CRUD app will make all your complex and secure online bank account look plain SILLY! Trust me :innocent:

## Routing Number Validations

The Vault references [RoutingNumbers.Info](https://www.routingnumbers.info/index.html) to validate user inputted routing numbers. Given limited resources and time this was a good starting point for verification, but it would be wise/a long term initiative to build around a more trusted source. Some options are listed below, most are just routing number lookup validators though:

| Resource | Link | Type |
| -------- |:----:| :---:|
| Wiki | [wiki description](https://en.wikipedia.org/wiki/ABA_routing_transit_number) | Reference |
| frbservices | [frbservices.org](https://www.frbservices.org/resources/routing-number-directory/index.html) | Lookup/Base Directory |
| American Bankers Assocation | [American Bankers Assocation](https://routingnumber.aba.com/default1.aspx) | Lookup |

## Things you'll need:
* ruby 2.5.0
* rails 5.2.2.1
* postgres 11.2
* node 11.12.0
* yarn 1.13.0

### Clone down, create, and run:
```
git@github.com:chastep/vault.git
cd vault
rails db:create
rails db:migrate
rails db:seed
yarn install
rails s
```

If you would like to make frontend changes locally and have them reload in realtime run `./bin/webpack-dev-server` alongside `rails s`.

### Navigation
* GET `http://localhost:3000/bank_accounts` => display all current bank accounts
* GET `http://localhost:3000/bank_accounts/new` => display all create bank account form
* POST `http://localhost:3000/bank_accounts` => create bank account (provide corresponding params)
* GET `http://localhost:3000/bank_accounts/(:id)` => show bank account (if present)
* PATCH/PUT `http://localhost:3000/bank_accounts/(:id)` => update bank account (if present)
* DELETE `http://localhost:3000/bank_accounts/(:id)` => delete bank account (if present)

### Heroku (**UNDER DEVELOPMENT**)
[Heroku Vault Site](https://fathomless-everglades-82491.herokuapp.com/bank_accounts)

There are currently issues with webpack/assest compiling that's causing all styling/`semantic-ui-react/semantic-ui-css` related components to not appear. It work functionally, but doesn't look good/handle form erros well. Still trying to figure out what is wrong.

### Testing locally: RSpec
```
bundle exec rpsec
yarn test
```

Just open a PR and push if you find something wrong with The Vault, any feedback would be greatly appreciated!

The Vault is released under the [MIT Open Source license](LICENSE.md)
