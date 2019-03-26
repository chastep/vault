require 'rails_helper'

RSpec.describe Adapter, type: :request do
  context 'Routing Number Adapter' do
    let(:adapter) { Adapter::RoutingNumberInfoAdapter.new }
  
    describe '#initialize' do 
      context '#client' do
        it 'should exist' do
          expect { adapter.client }.not_to raise_error
        end
      end
    end

    describe 'lookup' do
      it 'should return a routing number if valid' do
        expect(adapter.lookup('011000015')).to eq('011000015')
      end

      it 'should return nil if invalid' do
        expect(adapter.lookup('012345678')).to eq(nil)
      end
    end
  end
end
