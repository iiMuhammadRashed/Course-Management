class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    ['page', 'sort', 'limit', 'fields'].forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`,
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(sortString) {
    this.query = this.query.sort(
      sortString ? sortString.split(',').join(' ') : '-createdAt',
    );
    return this;
  }

  limitFields(fields) {
    this.query = this.query.select(
      fields ? fields.split(',').join(' ') : '-__v',
    );
    return this;
  }

  paginate(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFeatures;
