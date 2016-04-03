'use strict';

var expect = require( 'chai' ).expect;

var myLambda = require( '../index' );

describe( 'myLambda', function() {

    [
        "Richard",
        "rhyatt"

    ].forEach( function( validName ) {

        it( 'successful invocation', function( done ) {

            var context = {

                succeed: function( result ) {

                        expect( result.valid ).to.be.true;
                        done();
                    },

                fail: function() {

                        done( new Error( 'should not call context.fail' ) );
                    }
            }

            myLambda.handler( { name: validName }, context );
        });
    });

    [
        "Fred",
        undefined

    ].forEach( function( invalidName ) {

        it( 'fail: when name is invalid', function( done ) {

            var context = {

                succeed: function() {

                        done( new Error( 'Name should not be valid' ) );
                    },

                fail: function( err ) {


                        expect( err.message ).to.equal( 'unknown name' );
                        done();
                    }
            }

            myLambda.handler( { name: invalidName }, context );
        });
    });
});
