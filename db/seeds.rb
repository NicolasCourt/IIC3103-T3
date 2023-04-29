# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

auto = Auto.create([
    {   patente: "ACDJ21",
        lat:-33.45385328727835,
        lng: -70.76305211907417,
    },
    {   patente: "AECD21",
        lat:-33.43437287402113,
        lng: -70.63121619255068,
    },
    {   patente: "EEEE21",
        lat:-33.525962415133086,
        lng: -70.6398429016494,
    },
    {   patente: "PFR71",
        lat:-33.534862415133086,
        lng: -70.6392429016494,
    },
    {   patente: "FFFFF",
        lat:-33.524862415133086,
        lng: -70.6298429016494,
    }
])