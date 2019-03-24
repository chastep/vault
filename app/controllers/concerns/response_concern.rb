module ResponseConcern
  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def bank_account_payload(record)
    {
      id: record.id,
      account_number: record.account_number,
      routing_number: record.routing_number,
      nickname: record.nickname,
      address: record.location.address,
      address2: record.location.address2,
      city: record.location.city,
      postal: record.location.postal,
      created_at: record.created_at,
      updated_at: record.updated_at
    }
  end
end
