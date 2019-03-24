require 'rails_helper'

RSpec.describe 'Bank Accounts API', type: :request do
  let!(:bank_accounts) { create_list(:bank_account, 5) }
  let(:bank_acct_1) { bank_accounts.first }
  let(:location_1) { bank_acct_1.location }
  let(:valid_params) do
    {
      bank_account: {
        account_number: '999888777',
        routing_number: '111222333',
        nickname: 'Bank Acct Nickname',
        location_attributes: {
          address: '456 Faker St',
          address2: 'Suite 789',
          city: 'New York',
          postal: 54321
        }
      }
    }
  end
  let(:valid_params_2) do
    {
      bank_account: {
        account_number: '777666555',
        routing_number: '111222333',
        nickname: 'Bank Acct Nickname',
        location_attributes: {
          address: location_1.address,
          address2: location_1.address2,
          city: location_1.city,
          postal: location_1.postal
        }
      }
    }
  end
  let(:invalid_params) do
    {
      bank_account: {
        account_number: nil,
        routing_number: '111222333',
        nickname: 'Bank Acct Nickname',
        location_attributes: {
          address: '456 Faker St',
          address2: 'Suite 789',
          city: 'New York',
          postal: 54321
        }
      }
    }
  end
  let(:invalid_params_2) do
    {
      bank_account: {
        account_number: '999888777',
        routing_number: '111222333',
        nickname: 'Bank Acct Nickname',
        location_attributes: {
          postal: 98765
        }
      }
    }
  end
  let(:update_params) do
    { 
      bank_account: {
        account_number: '123123123'
      }
    }
  end

  describe 'GET /bank_accounts' do
    before { get '/api/bank_accounts' }

    it 'returns bank Accounts' do
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /bank_accounts' do
    context 'when request is valid' do
      before { post '/api/bank_accounts', params: valid_params }

      it 'creates a bank account' do
        expect(json['account_number']).to eq('999888777')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when request is valid' do
      before { post '/api/bank_accounts', params: valid_params_2 }

      it 'creates a bank account' do
        expect(json['account_number']).to eq('777666555')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/bank_accounts', params: invalid_params }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(json['message']).to match(/Validation failed: Account number can't be blank/)
      end
    end

    context 'when the request has invalid location params' do
      before { post '/api/bank_accounts', params: invalid_params_2 }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(json['message']).to match(/Invalid parameters/)
      end

    end
  end

  describe 'GET /bank_accounts/:id' do
    before { get "/api/bank_accounts/#{bank_acct_1.id}" }

    context 'when the record exists' do
      it 'returns the bank account' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(bank_acct_1.id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      before { get "/api/bank_accounts/nil" }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find BankAccount/)
      end
    end
  end

  describe 'PUT /bank_accounts/:id' do
    context 'when the record exists' do
      before { put "/api/bank_accounts/#{bank_acct_1.id}", params: update_params }

      it 'updates the record' do
        expect(response.body).to be_empty
        expect(bank_acct_1.reload.account_number).to eq('123123123')
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'DELETE /bank_accounts/:id' do
    before { delete "/api/bank_accounts/#{bank_acct_1.id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)

      get '/api/bank_accounts'

      expect(json.size).to eq(4)
    end
  end
end
